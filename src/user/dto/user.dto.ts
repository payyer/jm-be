import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    @MinLength(2)
    username: string

    @IsNotEmpty()
    @IsPhoneNumber("VN")
    phone: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @MinLength(6)
    address: string
}