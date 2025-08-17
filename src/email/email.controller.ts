import { Body, Controller, Get } from "@nestjs/common";
import { EmailService } from "./email.service";
import { SkipAuth } from "src/auth/decorator/skipAuth.decorator";

@Controller("email")
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @SkipAuth()
    @Get("otp")
    getOTP(@Body('email') email: string) {
        return this.emailService.getOTP(email)
    }
}