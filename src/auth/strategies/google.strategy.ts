import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../services/auth/auth.service';
import { UuidService } from 'nestjs-uuid';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private authServices: AuthService,
        private uuidServices: UuidService
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URI,
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        const { name, displayName, emails } = profile;
        const pass = this.uuidServices.generate({ version: 4 });
        const user = await this.authServices.validateGoogleUser({
            email: emails[0].value,
            name: displayName
                ? displayName
                : `${name.givenName} ${name.familyName}`,
            password: pass,
        });

        return { id: user.id, email: user.email };
    }
}
