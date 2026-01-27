import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseCrudService } from '../common/services/base-crud.service';
import { Prisma, Purchase } from '@prisma/client';
import { Result, Ok, Err } from 'oxide.ts';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { CreateBulkPurchaseDto } from './dto/create-bulk-purchase.dto';

@Injectable()
export class PurchaseService extends BaseCrudService<
    Purchase,
    CreatePurchaseDto,
    UpdatePurchaseDto
> {
    protected readonly modelName = 'purchase';
    protected readonly modelDisplayName = 'Purchase';

    constructor(prisma: PrismaService) {
        super(prisma);
    }

    protected getModelDelegate() {
        return this.prisma.purchase;
    }

    async FindPurchaseByCreatedAt(createdAt: Date): Promise<Purchase[]> {
        return this.findManyBy({ createdAt });
    }

    async findFivePurchaseByUser(userId: number): Promise<Purchase[]> {
        return this.findManyBy(
            { userId },
            {
                orderBy: { id: 'desc' },
                take: 5,
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            image: true,
                            category: true,
                        },
                    },
                },
            },
        );
    }

    async createBulk(createBulkPurchaseDto: CreateBulkPurchaseDto): Promise<Purchase[]> {
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const purchases = await this.prisma.$transaction(
            createBulkPurchaseDto.items.map((item) =>
                this.prisma.purchase.create({
                    data: {
                        userId: createBulkPurchaseDto.userId,
                        productId: item.productId,
                        quantity: item.quantity,
                        total: item.total,
                        orderId: orderId,
                    } as Prisma.PurchaseUncheckedCreateInput,
                }),
            ),
        );

        return purchases;
    }

    async update(id: number, UpdatePurchaseDto: UpdatePurchaseDto): Promise<Result<Purchase, string>> {
        const findResult = await this.findOne(id);
        
        if (findResult.isErr()) {
            return findResult;
        }

        try {
            const entity = await this.getModelDelegate().update({
                where: { id },
                data: {
                    userId: UpdatePurchaseDto.userId,
                    productId: UpdatePurchaseDto.productId,
                    quantity: UpdatePurchaseDto.quantity,
                    total: UpdatePurchaseDto.total,
                    orderId: UpdatePurchaseDto.orderId,
                } as Prisma.PurchaseUncheckedUpdateInput,
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