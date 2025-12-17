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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../middleware/roles.guard';
import { Roles } from '../middleware/roles.decorator';

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Créer un nouveau produit (admin uniquement)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Le produit a été créé avec succès.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Données invalides.',
  })
  @ApiBody({ type: CreateProductDto })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les produits' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste de tous les produits.',
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un produit par ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID du produit' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Le produit a été trouvé.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Produit non trouvé.',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Mettre à jour un produit (admin uniquement)' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID du produit' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Le produit a été mis à jour avec succès.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Produit non trouvé.',
  })
  @ApiBody({ type: UpdateProductDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Supprimer un produit (admin uniquement)' })
  @ApiParam({ name: 'id', type: 'number', description: 'ID du produit' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Le produit a été supprimé avec succès.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Produit non trouvé.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}

