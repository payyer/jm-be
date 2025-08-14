import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto, SignInDto } from './dto/AuthDto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from "express"
import * as bcrypt from 'bcrypt';
import { google } from "googleapis"
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private configService: ConfigService
    ) { }

    async signIn(signInDto: SignInDto, res: Response) {
        const { emailOrPhone, password } = signInDto

        const user = await this.usersRepository.findOne({ where: [{ email: emailOrPhone }, { phone: emailOrPhone }] })

        if (!user) throw new BadRequestException("Email or Phone or Password is wrong")

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) throw new BadRequestException("Email or Phone or Password is wrong")

        const payload = { sub: user.id, userRole: user.role, username: user.username }

        const access_token = await this.jwtService.signAsync(payload)

        const expirationDate = new Date(Date.now() + 168 * 60 * 60 * 1000)
        res.cookie("Authorization", `Bearer ${access_token}`, { httpOnly: true, expires: expirationDate })
        res.cookie("isLogged", true, { expires: expirationDate })
    }

    async signInWithGoogle(access_token: string, res: Response) {
        const oauth2Client = new google.auth.OAuth2(
            this.configService.get<string>("GOOGLE_CLIENT_ID"),
            this.configService.get<string>("GOOGLE_CLIENT_SECRET"),
            this.configService.get<string>("GOOGLE_CALLBACK_URL"),
        )
        oauth2Client.setCredentials({ access_token });
        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: "v2"
        })
        const googleResponse = await oauth2.userinfo.get();

        const findUser = await this.usersRepository.findOne({ where: { email: googleResponse.data.email as string } })

        if (findUser) {
            const payload = { sub: findUser.id, userRole: findUser.role, username: findUser.username }
            const access_token = await this.jwtService.signAsync(payload)
            const expirationDate = new Date(Date.now() + 168 * 60 * 60 * 1000)
            res.cookie("Authorization", `Bearer ${access_token}`, { httpOnly: true, expires: expirationDate })
            res.cookie("isLogged", true, { expires: expirationDate })
            return
        }
        const saltOrRounds = await bcrypt.genSalt();

        const hashPassword = await bcrypt.hash(googleResponse.data.id as string, saltOrRounds);

        const user = new User();
        user.username = googleResponse.data.name as string;
        user.email = googleResponse.data.email as string;
        user.phone = "";
        user.password = hashPassword
        user.role = UserRole.USER;
        user.address = "";

        const newUser = await this.usersRepository.save(user)

        const payload = { sub: newUser.id, userRole: newUser.role, username: newUser.username }

        const createAccessToken = await this.jwtService.signAsync(payload)

        const expirationDate = new Date(Date.now() + 168 * 60 * 60 * 1000)
        res.cookie("Authorization", `Bearer ${createAccessToken}`, { httpOnly: true, expires: expirationDate })
        res.cookie("isLogged", true, { expires: expirationDate })
    }

    async register(registerDto: RegisterDto, res: Response) {
        const isDuplicateUser = await this.usersRepository.findOne({ where: [{ email: registerDto.email }, { phone: registerDto.phone }] })
        if (isDuplicateUser) throw new BadRequestException("Phone number or email already exists!")

        const saltOrRounds = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(registerDto.password, saltOrRounds);

        const user = new User();
        user.username = registerDto.username;
        user.email = registerDto.email;
        user.phone = registerDto.phone;
        user.password = hashPassword
        user.role = UserRole.USER;
        user.address = "";

        const newUser = await this.usersRepository.save(user)

        const payload = { sub: newUser.id, userRole: newUser.role, username: newUser.username }

        const access_token = await this.jwtService.signAsync(payload)

        const expirationDate = new Date(Date.now() + 168 * 60 * 60 * 1000)
        res.cookie("Authorization", `Bearer ${access_token}`, { httpOnly: true, expires: expirationDate })
        res.cookie("isLogged", true, { expires: expirationDate })
    }

    async logout(res: Response) {
        res.cookie("Authorization", "", { maxAge: 0 })
        res.cookie("isLogged", false, { maxAge: 0 })
    }
}