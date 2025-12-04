import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(identifier: string, password: string): Promise<any> {
        const emailResult = await this.findUserByEmail(identifier);
        
        const userResult = emailResult.isOk() 
            ? emailResult
            : await this.findUserByUsername(identifier);

        if (userResult.isErr()) {
            throw new NotFoundException(`User with identifier ${identifier} not found`);
        }

        const user = userResult.unwrap();
        
        const passwordResult = await this.validatePassword(password, user.password);
        
        return passwordResult
            .map(() => {
                const { password: _, ...result } = user;
                return result;
            })
            .unwrapOr(null);
    }

    private async findUserByEmail(identifier: string): Promise<Result<User, string>> {
        const user = await this.usersService.findOneByEmail(identifier);
        return user ? Ok(user) : Err('User not found by email');
    }

    private async findUserByUsername(identifier: string): Promise<Result<User, string>> {
        const user = await this.usersService.findOneByUsername(identifier);
        return user ? Ok(user) : Err('User not found by username');
    }

    private async validatePassword(password: string, hashedPassword: string): Promise<Result<boolean, string>> {
        try {
            const isValid = await bcrypt.compare(password, hashedPassword);
            return isValid ? Ok(true) : Err('Invalid password');
        } catch (error) {
            return Err('Password validation failed');
        }
    }

    async login(user: User): Promise<string> {
        const payload = { sub: user.id, email: user.email, role: user.role };
        return this.jwtService.sign(payload);
    }

}

