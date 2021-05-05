import { Injectable, HttpService } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { Cron, CronExpression } from '@nestjs/schedule';
import { map } from 'rxjs/operators';
import { MailService } from './mail/mail.service';
import { users } from './users';

@Injectable()
export class AppService {
    private baseUrl = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?';
    private data = [];

    constructor(
        private http: HttpService,
        private mailer: MailService
    ) { }

    @Cron('0 * * * * *')
    scheduleApiCall() {
        users.forEach(user => {
            let url = this.baseUrl + `pincode=${user.pincode}&date=${user.date}`;
            this.getApptData(url).subscribe(res => {
                this.data = res.sessions;
                if (this.data.length) {
                    this.mailer.send({
                        name: user.name,
                        email: user.email,
                        date: user.date,
                        hospitals: this.data.map(center => center.name)
                    });
                }
            });
        });
    }

    private getApptData(url: string) {
        return this.http.get(url).pipe(
            map(response => response.data)
        );
    }
}
