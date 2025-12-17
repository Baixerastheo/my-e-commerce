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
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
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
  @ApiBody({ type: CreatePurchaseDto })
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
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
  @ApiOperation({ summary: 'Récupérer tous les achats' })
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.purchaseService.findOne(id);
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
  @ApiOperation({ summary: 'Mettre à jour un achat' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de l\'achat' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'L\'achat a été mis à jour avec succès.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Achat non trouvé.',
  })
  @ApiBody({ type: UpdatePurchaseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un achat' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID de l\'achat' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'L\'achat a été supprimé avec succès.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Achat non trouvé.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.purchaseService.remove(id);
  }
}
