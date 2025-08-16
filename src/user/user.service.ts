import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/user.dto";
import { getFiledUpdate } from "src/utils/getFiledUpdate";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findOne(id: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id }, select: ['email', 'address', 'phone', 'username'] })
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findOne({ where: { id } })
        if (!user) {
            throw new BadRequestException("Can't find User")
        }
        const updateFiled = getFiledUpdate(user, updateUserDto);
        console.log({ updateFiled })

        if (updateFiled.email || updateFiled.phone) {
            const findUserByEmailOrPhone = await this.usersRepository.findOne({ where: [{ email: updateFiled.email }, { phone: updateFiled.phone }] })
            console.log({ findUserByEmailOrPhone })
            if (findUserByEmailOrPhone) throw new BadRequestException("Email hoặc Số điện thoại đã được sử dụng")
        }

        for (const [key] of Object.entries(updateFiled)) {
            user[key] = updateFiled[key]
        }
        const result = await this.usersRepository.save(user)
        return result
    }
}