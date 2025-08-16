import { UserService } from "./user.service";
import { Body, Controller, Get, Post, Put, Req } from "@nestjs/common";
import { GetUserAuthInfoRequest } from "src/types/customRequest.type";
import { UpdateUserDto } from "./dto/user.dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    findOne(@Req() req: GetUserAuthInfoRequest) {
        const userId = req.user.sub
        return this.userService.findOne(userId);
    }

    @Put()
    updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req: GetUserAuthInfoRequest) {
        const userId = req.user.sub
        return this.userService.updateUser(userId, updateUserDto);
    }

}