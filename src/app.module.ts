import { HttpModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';

@Module({
  imports: [MailModule, HttpModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule { }
