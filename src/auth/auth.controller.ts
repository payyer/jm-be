import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { RegisterDto, SignInDto } from './dto/AuthDto';
import { AuthService } from './auth.service';
import { SkipAuth } from './decorator/skipAuth.decorator';
import { Response } from "express"

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @SkipAuth()
    @Post("sign-in")
    signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.signIn(signInDto, res)
    }

    @SkipAuth()
    @Get("google")
    signInWithGoogle(@Body("access_token") access_token: string, @Res({ passthrough: true }) res: Response) {
        return this.authService.signInWithGoogle(access_token, res)
    }

    @SkipAuth()
    @Post('register')
    register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.register(registerDto, res)
    }

    @HttpCode(200)
    @Post("logout")
    logout(@Res({ passthrough: true }) res: Response) {
        return this.authService.logout(res)
    }
}
