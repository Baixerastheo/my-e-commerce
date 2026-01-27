import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/services/base-crud.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export class ProductsService extends BaseCrudService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  protected readonly modelName = 'product';
  protected readonly modelDisplayName = 'Product';

  constructor(prisma: PrismaService) {
    super(prisma);
  }

  protected getModelDelegate() {
    return this.prisma.product;
  }

  async create(createProductDto: CreateProductDto): Promise<Result<Product, string>> {
    try {
      const entity = await this.getModelDelegate().create({
        data: {
          ...createProductDto,
          specs: createProductDto.specs || [],
        },
      });
      return Ok(entity);
    } catch (error: any) {
      if (error.code === 'P2002') {
        return Err(`Unique constraint violation: ${error.meta?.target?.join(', ') || 'field'}`);
      }
      throw error;
    }
  }
}

