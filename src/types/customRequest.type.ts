import { Request } from "express";
import { UserRole } from "src/user/user.entity";

type UserInfo = {
    user: {
        sub: string,
        userRole: UserRole,
        username: string,
        iat: number
    }
}

export type GetUserAuthInfoRequest = Request & UserInfo