import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailDto } from 'src/help/dtos/SendMail.dto';

@Injectable()
export class HelpService {
    constructor(private mailServices: MailerService) {}

    async sendMail(sendMailDto: SendMailDto) {
        const { EMAIL } = process.env;
        const result = await this.mailServices.sendMail({
            from: EMAIL,
            to: EMAIL,
            html: `<h2>BITE Task Pro</h2>
                    <p><b>Message:</b></p>
                    <p>${sendMailDto.message}</p>
                    <p><b>Name:</b> ${sendMailDto.name}</p>
                    <p><b>Feedback email:</b> ${sendMailDto.email}</p>`,
        });
        return result;
    }
}
