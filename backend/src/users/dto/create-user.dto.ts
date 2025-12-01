import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateUserDto {
  @ApiProperty({
    description: "Nom d'utilisateur unique",
    example: 'johndoe',
    maxLength: 100,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @ApiProperty({
    description: 'Adresse email unique',
    example: 'john.doe@example.com',
    maxLength: 191,
  })
  @IsEmail()
  @MaxLength(191)
  email: string;

  @ApiProperty({
    description: 'Mot de passe',
    example: 'SecurePassword123!',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;

  @ApiPropertyOptional({
    description: 'Rôle de l\'utilisateur',
    enum: UserRole,
    example: UserRole.USER,
    default: UserRole.USER,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

