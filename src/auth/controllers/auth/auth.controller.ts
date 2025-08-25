import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { AuthDto } from 'src/auth/dtos/Auth.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @Post('signin')
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const response = await this.authService.getTokens(
      req.user['id'],
      req.user['email'],
    );
    await this.authService.updateRefreshToken(
      req.user['id'],
      req.user['email'],
    );
    res.redirect(
      `${process.env.FRONTEND_URL}?accessToken=${response.accessToken}&refreshToken=${response.refreshToken}`,
    );
  }

  @Public()
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    res.status(204).json({ message: 'Logout' });
    return this.authService.logout(req.user['sub']);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Public()
  @UseGuards(AccessTokenGuard)
  @Get('current')
  getCurrent(@Req() req: Request) {
    return this.authService.getCurrentUser(req.user['email']);
  }
}
