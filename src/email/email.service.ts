import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
@Injectable()
export class EmailService {
    constructor(
        private readonly mailService: MailerService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }
    async getOTP(email: string) {
        const user = await this.userRepository.findOne({ where: { email } })
        if (!user) throw new BadRequestException("Email không tồn tại")

        const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString()
        const rawOtp = Math.floor(100000 + Math.random() * 900000)
        const saltOrRounds = await bcrypt.genSalt();
        const hashOtp = await bcrypt.hash(rawOtp.toString(), saltOrRounds);

        user.otpCode = hashOtp
        user.otpExpiresAt = otpExpiresAt

        await this.userRepository.save(user)

        const text = `Mã OTP của bạn là: ${rawOtp} .Mã có hiệu lực trong 5p, không chia sẽ mã này cho bất kỳ ai !!! `
        await this.mailService.sendMail({
            from: "Lê Quốc Anh <quocanhle112@mgila.com>",
            to: email,
            subject: "Mã OTP để đổi mật khẩu",
            text
        })

        return "Hãy kiểm tra email để lấy được OTP"
    }
}