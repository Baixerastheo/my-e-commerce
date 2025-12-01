import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsObject,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum EventType {
  PRODUCT_VIEW = 'product_view',
  ADD_TO_CART = 'add_to_cart',
  SEARCH = 'search',
  PURCHASE = 'purchase',
}

export class CreateAnalyticsEventDto {
  @ApiProperty({
    description: 'Type d\'événement',
    enum: EventType,
    example: EventType.PRODUCT_VIEW,
  })
  @IsEnum(EventType)
  eventType: EventType;

  @ApiPropertyOptional({
    description: 'ID de session unique',
    example: 'session_1234567890_abc123',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  sessionId?: string;

  @ApiPropertyOptional({
    description: 'Page où l\'événement s\'est produit',
    example: '/product/1',
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  page?: string;

  @ApiPropertyOptional({
    description: 'ID du produit concerné',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  productId?: number;

  @ApiPropertyOptional({
    description: 'Nom du produit',
    example: 'Laptop Pro 14"',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  productName?: string;

  @ApiPropertyOptional({
    description: 'Prix du produit',
    example: 1200,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  productPrice?: number;

  @ApiPropertyOptional({
    description: 'Catégorie du produit',
    example: 'Ordinateurs portables',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  productCategory?: string;

  @ApiPropertyOptional({
    description: 'Quantité',
    example: 2,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Valeur totale du panier',
    example: 2400,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  cartValue?: number;

  @ApiPropertyOptional({
    description: 'Terme de recherche',
    example: 'laptop',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  searchTerm?: string;

  @ApiPropertyOptional({
    description: 'Nombre de résultats de recherche',
    example: 12,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  searchResults?: number;

  @ApiPropertyOptional({
    description: 'Métadonnées supplémentaires',
    example: { items: [{ productId: 1, quantity: 2 }] },
    type: 'object',
  })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

