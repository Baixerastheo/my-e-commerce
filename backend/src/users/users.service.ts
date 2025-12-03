import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany({
            orderBy: { id: 'asc' },
        });
    }

    async findOne(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findOneByUsername(username: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { username },
        });
        
        try {
            return user;
        } catch (error) {
            return null;
        }
    }

    async findOneByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        try {
            return user;
        } catch (error) {
            return null;
        }
    }


    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.prisma.user.create({
            data: createUserDto,
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.findOne(id);

        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    async remove(id: number): Promise<User> {
        await this.findOne(id);

        return this.prisma.user.delete({
            where: { id },
        });
    }
}