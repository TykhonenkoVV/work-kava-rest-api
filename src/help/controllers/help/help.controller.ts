import { Body, Controller, Post } from '@nestjs/common';
import { SendMailDto } from 'src/help/dtos/SendMail.dto';
import { HelpService } from 'src/help/services/help/help.service';

@Controller('api/help')
export class HelpController {
    constructor(private helpServices: HelpService) {}
    @Post()
    sendMail(@Body() sendMailDto: SendMailDto) {
        return this.helpServices.sendMail(sendMailDto);
    }
}
