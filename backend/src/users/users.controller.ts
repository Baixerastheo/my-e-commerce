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
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
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
    @ApiBody({ type: CreateUserDto })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
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
    @ApiBody({ type: UpdateUserDto })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
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
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}