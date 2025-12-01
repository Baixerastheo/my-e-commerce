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

@ApiTags('users')
@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Récupérer tous les utilisateurs' })
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

    @Post()
    @ApiOperation({ summary: 'Créer un nouvel utilisateur' })
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
    @ApiOperation({ summary: 'Mettre à jour un utilisateur' })
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
    @ApiOperation({ summary: 'Supprimer un utilisateur' })
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