import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../middleware/roles.guard';
import { Roles } from '../middleware/roles.decorator';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: 'Récupérer tous les utilisateurs (admin uniquement)' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Liste de tous les utilisateurs.',
    })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID de l\'utilisateur' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'L\'utilisateur a été trouvé.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Utilisateur non trouvé.',
    })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const result = await this.usersService.findOne(id);
        if (result.isErr()) {
            throw new NotFoundException(result.unwrapErr());
        }
        return result.unwrap();
    }

    @Get(':username')
    @ApiOperation({ summary: 'Récupérer un utilisateur par username' })
    @ApiParam({ name: 'username', type: 'string', description: 'Username de l\'utilisateur' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'L\'utilisateur a été trouvé.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Utilisateur non trouvé.',
    })
    findOneByUsername(@Param('username') username: string) {
        return this.usersService.findOneByUsername(username);
    }

    @Get(':email')
    @ApiOperation({ summary: 'Récupérer un utilisateur par email' })
    @ApiParam({ name: 'email', type: 'string', description: 'Email de l\'utilisateur' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'L\'utilisateur a été trouvé.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Utilisateur non trouvé.',
    })
    findOneByEmail(@Param('email') email: string) {
        return this.usersService.findOneByEmail(email);
    }
    
    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: 'Créer un nouvel utilisateur (admin uniquement)' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'L\'utilisateur a été créé avec succès.',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Données invalides.',
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'Contrainte unique violée.',
    })
    @ApiBody({ type: CreateUserDto })
    async create(@Body() createUserDto: CreateUserDto) {
        const result = await this.usersService.create(createUserDto);
        if (result.isErr()) {
            throw new ConflictException(result.unwrapErr());
        }
        return result.unwrap();
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: 'Mettre à jour un utilisateur (admin uniquement)' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID de l\'utilisateur' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'L\'utilisateur a été mis à jour avec succès.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Utilisateur non trouvé.',
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
        description: 'Contrainte unique violée.',
    })
    @ApiBody({ type: UpdateUserDto })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        const result = await this.usersService.update(id, updateUserDto);
        if (result.isErr()) {
            const error = result.unwrapErr();
            if (error.includes('not found')) {
                throw new NotFoundException(error);
            }
            throw new ConflictException(error);
        }
        return result.unwrap();
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: 'Supprimer un utilisateur (admin uniquement)' })
    @ApiParam({ name: 'id', type: 'number', description: 'ID de l\'utilisateur' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'L\'utilisateur a été supprimé avec succès.',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Utilisateur non trouvé.',
    })
    async remove(@Param('id', ParseIntPipe) id: number) {
        const result = await this.usersService.remove(id);
        if (result.isErr()) {
            throw new NotFoundException(result.unwrapErr());
        }
        return result.unwrap();
    }
}