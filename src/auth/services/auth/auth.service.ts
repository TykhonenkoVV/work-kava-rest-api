import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/srvices/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthDto } from 'src/auth/dtos/Auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.getCurrent(createUserDto.email);
    if (userExists) {
      throw new HttpException('User alredy exist', 409);
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const newUser = await this.usersService.createUser({
      ...createUserDto,
      password: hash,
      role: 'ADMIN', //Доробити логіку ролей
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return { name: createUserDto.name, email: createUserDto.email };
  }

  async signIn(authDto: AuthDto) {
    const user = await this.usersService.getCurrent(authDto.email);

    const isMatch = await bcrypt.compare(authDto.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Password or email is incorrect');
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      tokens,
      user: {
        name: user.name,
        email: user.email,
        theme: user.theme,
        avatarURL: user.avatarURL,
        avatarURLsmall: user.avatarURLsmall,
      },
    };
  }

  async logout(userId: string) {
    return this.usersService.updateUser(userId, { refreshToken: null });
  }

  async deleteUser(userId: string) {
    return this.usersService.deleteUser(userId);
  }

  async getCurrentUser(email: string) {
    const user = await this.usersService.getCurrent(email);
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      theme: user.theme,
      avatarURL: user.avatarURL,
      avatarURLsmall: user.avatarURLsmall,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
    await this.usersService.updateUser(userId, {
      refreshToken: hashedRefreshToken,
    });
    return { tokens: { refreshToken: hashedRefreshToken } };
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_SECRET_ACCESS,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_SECRET_REFRESH,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.getUserById(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async validateGoogleUser(googleUserDto: CreateUserDto) {
    const user = await this.usersService.getCurrent(googleUserDto.email);
    if (user)
      return {
        id: user._id,
        email: user.email,
      };
    const newUser = await this.signUp(googleUserDto);
    const currentUser = await this.getCurrentUser(newUser.email);
    return {
      id: currentUser.id,
      email: currentUser.email,
    };
  }
}
