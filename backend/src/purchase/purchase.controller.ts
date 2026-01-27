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
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../middleware/roles.guard';
import { Roles } from '../middleware/roles.decorator';
import { CreateBulkPurchaseDto } from './dto/create-bulk-purchase.dto';

@ApiTags('purchases')
@Controller('api/purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel achat' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'L\'achat a été créé avec succès.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Contrainte unique violée.',
  })
  @ApiBody({ type: CreatePurchaseDto })
  async create(@Body() createPurchaseDto: CreatePurchaseDto) {
    const result = await this.purchaseService.create(createPurchaseDto);
    if (result.isErr()) {
      throw new ConflictException(result.unwrapErr());
    }
    return result.unwrap();
  }

  @Post('bulk')
  @ApiOperation({ summary: 'Créer plusieurs achats groupés dans une seule commande' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Les achats ont été créés avec succès.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides.',
  })
  @ApiBody({ type: CreateBulkPurchaseDto })
  createBulk(@Body() createBulkPurchaseDto: CreateBulkPurchaseDto) {
    return this.purchaseService.createBulk(createBulkPurchaseDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Récupérer tous les achats (admin uniquement)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste de tous les achats.',
  })
  findAll() {
    return this.purchaseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un achat par ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de l\'achat' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'L\'achat a été trouvé.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Achat non trouvé.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.purchaseService.findOne(id);
    if (result.isErr()) {
      throw new NotFoundException(result.unwrapErr());
    }
    return result.unwrap();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Récupérer les 5 derniers achats d\'un utilisateur' })
  @ApiParam({ name: 'userId', type: 'number', description: 'ID de l\'utilisateur' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Les 5 derniers achats de l\'utilisateur.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Aucun achat trouvé pour cet utilisateur.',
  })
  findFivePurchaseByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.purchaseService.findFivePurchaseByUser(userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Mettre à jour un achat (admin uniquement)' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de l\'achat' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'L\'achat a été mis à jour avec succès.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Achat non trouvé.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Contrainte unique violée.',
  })
  @ApiBody({ type: UpdatePurchaseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    const result = await this.purchaseService.update(id, updatePurchaseDto);
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
  @ApiOperation({ summary: 'Supprimer un achat (admin uniquement)' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de l\'achat' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'L\'achat a été supprimé avec succès.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Achat non trouvé.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.purchaseService.remove(id);
    if (result.isErr()) {
      throw new NotFoundException(result.unwrapErr());
    }
    return result.unwrap();
  }
}
