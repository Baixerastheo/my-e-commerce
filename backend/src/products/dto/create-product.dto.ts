import {
  IsString,
  IsNumber,
  IsUrl,
  IsOptional,
  IsArray,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nom du produit',
    example: 'Laptop Pro 14"',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'Prix du produit en euros',
    example: 1200,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Catégorie du produit',
    example: 'Ordinateurs portables',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  category: string;

  @ApiProperty({
    description: 'URL de l\'image du produit',
    example: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2',
    maxLength: 500,
  })
  @IsUrl()
  @MaxLength(500)
  image: string;

  @ApiPropertyOptional({
    description: 'Description du produit',
    example: 'Un ultrabook puissant pour les professionnels en déplacement.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Spécifications techniques du produit',
    example: ['Intel Core i7', '16 Go RAM', '512 Go SSD'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specs?: string[];
}

