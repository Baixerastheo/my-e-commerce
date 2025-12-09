import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Purchase } from '@prisma/client';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto'; 

@Injectable()
export class PurchaseService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Purchase[]> {
        return this.prisma.purchase.findMany({
            orderBy : {id: 'asc'},
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

    // return the five latest purchases by userId
    // this function is 
    async findFivePurchaseByUser(userId: number): Promise<Purchase[]> {
        const findFivePurchase = await this.prisma.purchase.findMany({
            where: { userId: userId },
            orderBy: { id: 'desc' },
            take: 5
        });

        if (findFivePurchase.length == 0) {
            throw new NotFoundException(`the user ${userId} has not yet placed orders`);
        }

        return findFivePurchase;
    }

    async create(CreatePurchaseDto: CreatePurchaseDto): Promise<Purchase> {
        return this.prisma.purchase.create({
            data: CreatePurchaseDto,
        });
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
            },
        });
    }

    async remove(id: number): Promise<Purchase> {
        await this.findOne(id);

        return this.prisma.purchase.delete({
            where: { id },
        });
    }
}