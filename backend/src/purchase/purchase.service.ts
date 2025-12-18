import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Purchase } from '@prisma/client';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { CreateBulkPurchaseDto } from './dto/create-bulk-purchase.dto'; 

@Injectable()
export class PurchaseService {
    constructor(private prisma: PrismaService) { }

    async findAll(): Promise<Purchase[]> {
        return this.prisma.purchase.findMany({
            orderBy: { id: 'asc' },
        });
    }

    async findOne(id: number): Promise<Purchase> {
        const purchase = await this.prisma.purchase.findUnique({
            where: { id },
        });
        if (!purchase) {
            throw new NotFoundException(`Purchase with ID ${id} not found`);
        }
        return purchase;
    }

    async FindPurchaseByCreatedAt(createdAt: Date): Promise<Purchase[]> {
        const purchase = await this.prisma.purchase.findMany({
            where: { createdAt },
        });
        if (purchase.length === 0) {
            throw new NotFoundException('Purchase not found')
        }
        return purchase;
    }

    // return the five latest purchases by userId
    async findFivePurchaseByUser(userId: number): Promise<Purchase[]> {
        const findFivePurchase = await this.prisma.purchase.findMany({
            where: { userId: userId },
            orderBy: { id: 'desc' },
            take: 5,
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true,
                        category: true
                    }
                }
            }
        });
        return findFivePurchase;
    }

    async create(CreatePurchaseDto: CreatePurchaseDto): Promise<Purchase> {
        return this.prisma.purchase.create({
            data: CreatePurchaseDto,
        });
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

    async update(id: number, UpdatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
        await this.findOne(id);
        return this.prisma.purchase.update({
            where: { id },
            data: {
                userId: UpdatePurchaseDto.userId,
                productId: UpdatePurchaseDto.productId,
                quantity: UpdatePurchaseDto.quantity,
                total: UpdatePurchaseDto.total,
                orderId: UpdatePurchaseDto.orderId,
            } as Prisma.PurchaseUncheckedUpdateInput,
        });
    }

    async remove(id: number): Promise<Purchase> {
        await this.findOne(id);

        return this.prisma.purchase.delete({
            where: { id },
        });
    }
}