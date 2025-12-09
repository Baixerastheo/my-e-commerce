import {
  IsNumber,
  IsInt,
  IsOptional,
  Min,
  IsPositive,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePurchaseDto {
  @ApiPropertyOptional({
    description: 'ID de l\'utilisateur qui effectue l\'achat',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  userId?: number;

  @ApiPropertyOptional({
    description: 'ID du produit acheté',
    example: 5,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  productId?: number;

  @ApiPropertyOptional({
    description: 'Quantité de produits achetés',
    example: 2,
    minimum: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Montant total de l\'achat en euros',
    example: 2400.00,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  total?: number;
}

