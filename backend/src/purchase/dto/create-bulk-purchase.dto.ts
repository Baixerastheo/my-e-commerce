import {
  IsNumber,
  IsInt,
  Min,
  IsPositive,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PurchaseItemDto {
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
    description: 'Montant total pour ce produit en euros',
    example: 2400.00,
    minimum: 0,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  total: number;
}

export class CreateBulkPurchaseDto {
  @ApiProperty({
    description: 'ID de l\'utilisateur qui effectue l\'achat',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({
    description: 'Liste des produits à acheter',
    type: [PurchaseItemDto],
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  items: PurchaseItemDto[];
}
