import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { Result, Ok, Err } from 'oxide.ts';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(identifier: string, password: string): Promise<Result<Omit<User, 'password'>, string>> {
        const emailResult = await this.findUserByEmail(identifier);
        
        const userResult = emailResult.isOk() 
            ? emailResult
            : await this.findUserByUsername(identifier);

        if (userResult.isErr()) {
            return Err(`User with identifier ${identifier} not found`);
        }

        const user = userResult.unwrap();
        
        const passwordResult = await this.validatePassword(password, user.password);
        
        return passwordResult
            .map(() => {
                const { password: _, ...result } = user;
                return result;
            })
            .mapErr(() => 'Invalid password');
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

    async register(registerDto: RegisterDto): Promise<Result<string, string>> {
        const existingEmail = await this.usersService.findOneByEmail(registerDto.email);
        if (existingEmail) {
            return Err(`Email ${registerDto.email} is already registered`);
        }

        const existingUsername = await this.usersService.findOneByUsername(registerDto.username);
        if (existingUsername) {
            return Err(`Username ${registerDto.username} is already taken`);
        }

        const createResult = await this.usersService.create({
            username: registerDto.username,
            email: registerDto.email,
            password: await bcrypt.hash(registerDto.password, 10),
        });
        
        if (createResult.isErr()) {
            return createResult;
        }
        
        const user = createResult.unwrap();
        const token = await this.login(user);
        return Ok(token);
    }

    async profile(user: { id: number }): Promise<Result<Omit<User, 'password'>, string>> {
        const findResult = await this.usersService.findOne(user.id);
        if (findResult.isErr()) {
            return findResult;
        }
        const fullUser = findResult.unwrap();
        const { password: _, ...userWithoutPassword } = fullUser;
        return Ok(userWithoutPassword);
    }
}
