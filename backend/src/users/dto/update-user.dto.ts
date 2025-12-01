import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from './create-user.dto';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: "Nom d'utilisateur unique",
    example: 'johndoe',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username?: string;

  @ApiPropertyOptional({
    description: 'Adresse email unique',
    example: 'john.doe@example.com',
    maxLength: 191,
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(191)
  email?: string;

  @ApiPropertyOptional({
    description: 'Mot de passe',
    example: 'NewSecurePassword123!',
    minLength: 6,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password?: string;

  @ApiPropertyOptional({
    description: 'Rôle de l\'utilisateur',
    enum: UserRole,
    example: UserRole.ADMIN,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

