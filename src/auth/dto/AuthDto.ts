import { IsString } from "class-validator";
import { UserRole } from "src/user/user.entity";

export class SignInDto {
    @IsString()
    username: string;
    @IsString()
    email: string;
    @IsString()

    phone: string;
    @IsString()

    password: string
    @IsString()

    address: string;
    @IsString()

    role: UserRole;
    @IsString()

    cart_id: string;
}