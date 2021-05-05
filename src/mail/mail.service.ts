import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
// import { UserData } from '../user-data.model';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    send(user): void {
        this.mailerService.sendMail({
            to: user.email,
            from: 'bhatoora7786@gmail.com',
            subject: 'Vaccine Availability Alert',
            // text: 'Welcome Hi Test Mail',
            template: __dirname + '/templates/mailer',
            context: {
                name: user.name,
                hospitals: user.hospitals,
                date: user.date
            },

        }).then(() => console.log("Successfully sent"))
            .catch((error) => console.log("Could not send:" + error));
    }
}
