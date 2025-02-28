
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/user.schema';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {
    }

    async signIn(username: string, pass: string) {
        const foundUser: User = await this.usersService.findByUsername(username);
        if (foundUser != null && !this.usersService.verifyPassword(pass, foundUser.password)) {
            throw new UnauthorizedException();
        }

        const { password, ...result } = foundUser;

        const payload = { sub: foundUser.id, username: foundUser.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
