import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) { }
  sendMail() {
    const message = "Nhập đoạn mã này và lấy lại mật khẩu"
    this.mailService.sendMail({
      from: "JM Shop <quocanhle112@gmail.com>",
      to: 'xuanrin1412@gmail.com',
      subject: "How to Send Emails with Nodemailer",
      text: message
    })
  }
}
