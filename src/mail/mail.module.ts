import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


@Module({
    imports: [
        MailerModule.forRoot(
            {
                // transport: 'smtp://user@example.com:topsecret@smtp.example.com',
                // or
                transport: {
                    service: 'gmail',
                    auth: {
                        user: 'bhatoora7786@gmail.com',
                        pass: 'RGOEYCQFVQ*YHPQbGf65jbS@5rhHegZZ8kzLW*co2Tu1H6#gIOA@7MWhKq!4oAaJq6Zc!QPwh4VtUfpqwbAs3Y1VM^fVMgfL1M#a'
                    }
                },
                defaults: {
                    from: '"No Reply" <noreply@example.com>',
                },
                template: {
                    // dir: __dirname + '/templates',
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }
        ),
    ],
    providers: [MailService]
})
export class MailModule { }
