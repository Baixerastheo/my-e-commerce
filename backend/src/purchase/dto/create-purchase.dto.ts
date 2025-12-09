import {
  IsNumber,
  IsInt,
  Min,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseDto {
  @ApiProperty({
    description: 'ID de l\'utilisateur qui effectue l\'achat',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({
    description: 'ID du produit acheté',
    example: 5,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({
    description: 'Quantité de produits achetés',
    example: 2,
    minimum: 1,
    default: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Montant total de l\'achat en euros',
    example: 2400.00,
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  total: number;
}

