import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { SignInDto } from './dto/AuthDto';
import { AuthService } from './auth.service';
import { SkipAuth } from './decorator/skipAuth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("sign-in")
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto)
    }
    // @UseGuards(AuthGuard)

    @SkipAuth()
    @Get()
    findAll() {
        return []
    }
}
