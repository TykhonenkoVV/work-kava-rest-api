import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HelpController } from './controllers/help/help.controller';
import { HelpService } from './services/help/help.service';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST,
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            },
        }),
    ],
    controllers: [HelpController],
    providers: [HelpService],
})
export class HelpModule {}
