import { UserService } from "./user.service";
import { Controller, Get, Post, Req } from "@nestjs/common";
import { GetUserAuthInfoRequest } from "src/types/customRequest.type";

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

}