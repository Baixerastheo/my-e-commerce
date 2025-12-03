import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(identifier: string, password: string): Promise<any> {
        let user = null;
        
        try {
            user = await this.usersService.findOneByEmail(identifier);
        } catch (error) {
            throw new NotFoundException(`User with email ${identifier} not found, try with a username`);
        }
        
        if (!user) {
            try {
                user = await this.usersService.findOneByUsername(identifier);
            } catch (error) {
                throw new NotFoundException(`User with username ${identifier} not found`);
            }
        }

        if (user) {
            try {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (isPasswordValid) {
                    const { password: _, ...result } = user;
                    return result;
                }
            } catch (error) {
                return null;
            }
        }
        return null;
    }
    

}

