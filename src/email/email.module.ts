import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.get<string>("EMAIL_HOST"),
                    auth: {
                        user: configService.get<string>("EMAIL_USER"),
                        pass: configService.get<string>("EMAIL_PASSWORD"),
                    }
                }
            }),
        }),
        UserModule
    ],
    controllers: [EmailController],
    providers: [EmailService]
})
export class EmailModule { }