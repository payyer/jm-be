import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto, SignInDto } from './dto/AuthDto';
import { AuthService } from './auth.service';
import { SkipAuth } from './decorator/skipAuth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @SkipAuth()
    @Post("sign-in")
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto)
    }

    @SkipAuth()
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto)
    }
}
