import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PrismaService } from '../prisma/prisma.service';
import { Purchase, Prisma } from '@prisma/client';

describe('PurchaseService', () => {
  let service: PurchaseService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    purchase: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findFivePurchaseByUser', () => {
    const userId = 1;

    it('should return the five latest purchases for a user', async () => {
      const mockPurchases: Purchase[] = [
        {
          id: 5,
          userId: 1,
          productId: 1,
          quantity: 2,
          total: new Prisma.Decimal(199.98),
          orderId: null,
          createdAt: new Date('2024-01-05'),
        } as Purchase,
        {
          id: 4,
          userId: 1,
          productId: 2,
          quantity: 1,
          total: new Prisma.Decimal(99.99),
          orderId: null,
          createdAt: new Date('2024-01-04'),
        } as Purchase,
        {
          id: 3,
          userId: 1,
          productId: 3,
          quantity: 3,
          total: new Prisma.Decimal(299.97),
          orderId: null,
          createdAt: new Date('2024-01-03'),
        } as Purchase,
        {
          id: 2,
          userId: 1,
          productId: 1,
          quantity: 1,
          total: new Prisma.Decimal(99.99),
          orderId: null,
          createdAt: new Date('2024-01-02'),
        } as Purchase,
        {
          id: 1,
          userId: 1,
          productId: 2,
          quantity: 2,
          total: new Prisma.Decimal(199.98),
          orderId: null,
          createdAt: new Date('2024-01-01'),
        } as Purchase,
      ];

      mockPrismaService.purchase.findMany.mockResolvedValue(mockPurchases);

      const result = await service.findFivePurchaseByUser(userId);

      expect(result).toEqual(mockPurchases);
      expect(result).toHaveLength(5);
      expect(mockPrismaService.purchase.findMany).toHaveBeenCalledTimes(1);
      expect(mockPrismaService.purchase.findMany).toHaveBeenCalledWith({
        where: { userId: userId },
        orderBy: { id: 'desc' },
        take: 5,
      });
    });

    it('should return less than 5 purchases if user has fewer than 5 purchases', async () => {
      const mockPurchases: Purchase[] = [
        {
          id: 2,
          userId: 1,
          productId: 1,
          quantity: 1,
          total: new Prisma.Decimal(99.99),
          orderId: null,
          createdAt: new Date('2024-01-02'),
        } as Purchase,
        {
          id: 1,
          userId: 1,
          productId: 2,
          quantity: 2,
          total: new Prisma.Decimal(199.98),
          orderId: null,
          createdAt: new Date('2024-01-01'),
        } as Purchase,
      ];

      mockPrismaService.purchase.findMany.mockResolvedValue(mockPurchases);

      const result = await service.findFivePurchaseByUser(userId);

      expect(result).toEqual(mockPurchases);
      expect(result).toHaveLength(2);
      expect(mockPrismaService.purchase.findMany).toHaveBeenCalledWith({
        where: { userId: userId },
        orderBy: { id: 'desc' },
        take: 5,
      });
    });

    it('should throw NotFoundException when user has no purchases', async () => {
      mockPrismaService.purchase.findMany.mockResolvedValue([]);

      await expect(service.findFivePurchaseByUser(userId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findFivePurchaseByUser(userId)).rejects.toThrow(
        `the user ${userId} has not yet placed orders`,
      );
      expect(mockPrismaService.purchase.findMany).toHaveBeenCalledWith({
        where: { userId: userId },
        orderBy: { id: 'desc' },
        take: 5,
      });
    });

    it('should call prisma with correct parameters', async () => {
      const mockPurchases: Purchase[] = [
        {
          id: 1,
          userId: 2,
          productId: 1,
          quantity: 1,
          total: new Prisma.Decimal(99.99),
          orderId: null,
          createdAt: new Date('2024-01-01'),
        } as Purchase,
      ];

      mockPrismaService.purchase.findMany.mockResolvedValue(mockPurchases);
      const testUserId = 2;

      await service.findFivePurchaseByUser(testUserId);

      expect(mockPrismaService.purchase.findMany).toHaveBeenCalledWith({
        where: { userId: testUserId },
        orderBy: { id: 'desc' },
        take: 5,
      });
    });
  });
});

