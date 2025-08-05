import { Injectable } from '@nestjs/common';
import { RegisterDto, SignInDto } from './dto/AuthDto';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { User, UserRole } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private dataSource: DataSource,
        @InjectRepository(User)
        private usersRepository: Repository<User>

    ) { }

    async signIn(signInDto: SignInDto) {
        const { email, password, } = signInDto

        const user = await this.usersRepository.findOneBy({ email: email })

        if (!user) {
            return {
                message: "Email or password is wrong"
            }
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return {
                message: "Email or password is wrong"
            }
        }
        const payload = { sub: user.id, userRole: user.role, username: user.username }

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async register(registerDto: RegisterDto) {

        const saltOrRounds = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(registerDto.password, saltOrRounds);

        const user = new User();
        user.username = ""
        user.email = registerDto.email;
        user.phone = registerDto.phone;
        user.password = hashPassword
        user.role = UserRole.USER;
        user.address = "";


        const newUser = await this.usersRepository.save(user)

        const payload = { sub: newUser.id, userRole: newUser.role, username: newUser.username }

        return {
            user: newUser,
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}