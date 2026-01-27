import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Result, Ok, Err } from 'oxide.ts';

@Injectable()
export abstract class BaseCrudService<
  Model extends { id: number },
  CreateDto,
  UpdateDto,
> {
  protected abstract readonly modelName: string;
  protected abstract readonly modelDisplayName: string;

  constructor(protected readonly prisma: PrismaService) {}

  protected abstract getModelDelegate(): any;

  async create(createDto: CreateDto): Promise<Result<Model, string>> {
    try {
      const entity = await this.getModelDelegate().create({
        data: createDto as any,
      });
      return Ok(entity);
    } catch (error: any) {
      if (error.code === 'P2002') {
        return Err(`Unique constraint violation: ${error.meta?.target?.join(', ') || 'field'}`);
      }
      throw error;
    }
  }

  async findAll(options?: {
    orderBy?: Prisma.Enumerable<any>;
    where?: any;
    include?: any;
    take?: number;
    skip?: number;
  }): Promise<Model[]> {
    const defaultOptions = {
      orderBy: { id: 'asc' as const },
      ...options,
    };

    return this.getModelDelegate().findMany(defaultOptions);
  }

  async findOne(
    id: number,
    options?: {
      include?: any;
      select?: any;
    },
  ): Promise<Result<Model, string>> {
    const entity = await this.getModelDelegate().findUnique({
      where: { id },
      ...options,
    });

    if (!entity) {
      return Err(`${this.modelDisplayName} with ID ${id} not found`);
    }

    return Ok(entity);
  }

  async findOneBy(
    where: any,
    options?: {
      include?: any;
      select?: any;
    },
  ): Promise<Model | null> {
    return this.getModelDelegate().findUnique({
      where,
      ...options,
    });
  }

  async findManyBy(
    where: any,
    options?: {
      orderBy?: Prisma.Enumerable<any>;
      include?: any;
      take?: number;
      skip?: number;
    },
  ): Promise<Model[]> {
    return this.getModelDelegate().findMany({
      where,
      orderBy: { id: 'asc' as const },
      ...options,
    });
  }

  async update(id: number, updateDto: UpdateDto): Promise<Result<Model, string>> {
    const findResult = await this.findOne(id);
    
    if (findResult.isErr()) {
      return findResult;
    }

    try {
      const entity = await this.getModelDelegate().update({
        where: { id },
        data: updateDto as any,
      });
      return Ok(entity);
    } catch (error: any) {
      if (error.code === 'P2002') {
        return Err(`Unique constraint violation: ${error.meta?.target?.join(', ') || 'field'}`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Result<Model, string>> {
    const findResult = await this.findOne(id);
    
    if (findResult.isErr()) {
      return findResult;
    }

    const entity = await this.getModelDelegate().delete({
      where: { id },
    });
    return Ok(entity);
  }

  async count(where?: any): Promise<number> {
    return this.getModelDelegate().count({
      where,
    });
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.getModelDelegate().count({
      where: { id },
    });
    return count > 0;
  }
}

