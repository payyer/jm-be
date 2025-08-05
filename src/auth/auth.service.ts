import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/AuthDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
        const { username, email, phone, password, address, role, cart_id } = signInDto
        const payload = { sub: "1", username, email, phone }
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }


}