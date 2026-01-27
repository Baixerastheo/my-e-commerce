import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/services/base-crud.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService extends BaseCrudService<
    User,
    CreateUserDto,
    UpdateUserDto
> {
    protected readonly modelName = 'user';
    protected readonly modelDisplayName = 'User';

    constructor(prisma: PrismaService) {
        super(prisma);
    }

    protected getModelDelegate() {
        return this.prisma.user;
    }

    async findOneByUsername(username: string): Promise<User | null> {
        return this.findOneBy({ username });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.findOneBy({ email });
    }
}