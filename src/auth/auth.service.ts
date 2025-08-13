import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto, SignInDto } from './dto/AuthDto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User, UserRole } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from "express"
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private usersRepository: Repository<User>

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

        return {
            access_token
        }
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

        return {
            access_token
        }
    }

    async logout(res: Response) {
        res.cookie("Authorization", "", { maxAge: 0 })
        res.cookie("isLogged", false, { maxAge: 0 })
        return {
            message: "Đăng xuất thành công"
        }
    }
}