import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAnalyticsEventDto,
  EventType,
} from './dto/create-analytics-event.dto';
import { AnalyticsEvent, Prisma } from '@prisma/client';
import { uid } from 'uid';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async trackEvent(
    createEventDto: CreateAnalyticsEventDto,
  ): Promise<AnalyticsEvent> {
    return this.prisma.analyticsEvent.create({
      data: {
        id: uid(16),
        eventType: createEventDto.eventType,
        sessionId: createEventDto.sessionId,
        page: createEventDto.page,
        productId: createEventDto.productId || null,
        productName: createEventDto.productName,
        productPrice: createEventDto.productPrice || null,
        productCategory: createEventDto.productCategory,
        quantity: createEventDto.quantity,
        cartValue: createEventDto.cartValue || null,
        searchTerm: createEventDto.searchTerm,
        searchResults: createEventDto.searchResults,
        metadata: createEventDto.metadata
          ? (createEventDto.metadata as Prisma.InputJsonValue)
          : null,
      },
    });
  }

  async getEvents(filters?: {
    eventType?: string;
    productId?: number;
  }): Promise<AnalyticsEvent[]> {
    const where: {
      eventType?: string;
      productId?: number;
    } = {};

    if (filters?.eventType) {
      where.eventType = filters.eventType;
    }

    if (filters?.productId) {
      where.productId = filters.productId;
    }

    return this.prisma.analyticsEvent.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getStats() {
    const events = await this.prisma.analyticsEvent.findMany();

    const countBy = <T>(
      items: T[],
      keyFn: (item: T) => string | number,
    ): Record<string, number> => {
      const counts: Record<string, number> = {};
      items.forEach((item) => {
        const key = String(keyFn(item));
        counts[key] = (counts[key] || 0) + 1;
      });
      return counts;
    };

    const topN = (counts: Record<string, number>, n: number = 10) => {
      return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
    };

    const eventsByType = countBy(events, (e) => e.eventType);

    const productViews = countBy(
      events.filter(
        (e) => e.eventType === EventType.PRODUCT_VIEW && e.productId,
      ),
      (e) => e.productId!,
    );

    const productAdds: Record<string, number> = {};
    events
      .filter((e) => e.eventType === EventType.ADD_TO_CART && e.productId)
      .forEach((e) => {
        const key = String(e.productId);
        productAdds[key] = (productAdds[key] || 0) + (e.quantity || 1);
      });

    const searchTerms = countBy(
      events.filter((e) => e.eventType === EventType.SEARCH && e.searchTerm),
      (e) => (e.searchTerm || '').toLowerCase(),
    );

    const productPurchases: Record<string, number> = {};
    events
      .filter((e) => e.eventType === EventType.PURCHASE)
      .forEach((e) => {
        const metadata = e.metadata as {
          items?: Array<{ productId?: number; quantity?: number }>;
        } | null;
        if (metadata?.items && Array.isArray(metadata.items)) {
          metadata.items.forEach((item) => {
            if (item.productId) {
              const key = String(item.productId);
              productPurchases[key] =
                (productPurchases[key] || 0) + (item.quantity || 1);
            }
          });
        }
      });

    const totalViews = events.filter(
      (e) => e.eventType === EventType.PRODUCT_VIEW,
    ).length;
    const totalAdds = events.filter(
      (e) => e.eventType === EventType.ADD_TO_CART,
    ).length;
    const totalPurchases = events.filter(
      (e) => e.eventType === EventType.PURCHASE,
    ).length;

    const conversionRate =
      totalViews > 0 ? ((totalAdds / totalViews) * 100).toFixed(2) : '0.00';
    const finalConversionRate =
      totalAdds > 0 ? ((totalPurchases / totalAdds) * 100).toFixed(2) : '0.00';

    const totalCartValue = events
      .filter((e) => e.eventType === 'add_to_cart' && e.cartValue)
      .reduce((sum, e) => sum + Number(e.cartValue || 0), 0);

    const totalPurchaseValue = events
      .filter((e) => e.eventType === 'purchase' && e.cartValue)
      .reduce((sum, e) => sum + Number(e.cartValue || 0), 0);

    return {
      totalEvents: events.length,
      eventsByType,
      topProductViews: topN(productViews).map(([id, count]) => ({
        productId: Number(id),
        views: count,
      })),
      topProductAdds: topN(productAdds).map(([id, count]) => ({
        productId: Number(id),
        adds: count,
      })),
      topProductPurchases: topN(productPurchases).map(([id, count]) => ({
        productId: Number(id),
        purchases: count,
      })),
      topSearchTerms: topN(searchTerms).map(([term, count]) => ({
        term,
        searches: count,
      })),
      conversionRate: `${conversionRate}%`,
      finalConversionRate: `${finalConversionRate}%`,
      totalCartValue: totalCartValue.toFixed(2),
      totalPurchaseValue: totalPurchaseValue.toFixed(2),
      totalPurchases,
    };
  }

  async getTopProductViews(limit: number = 10) {
    const events = await this.prisma.analyticsEvent.findMany();
    
    const countBy = <T>(
      items: T[],
      keyFn: (item: T) => string | number,
    ): Record<string, number> => {
      const counts: Record<string, number> = {};
      items.forEach((item) => {
        const key = String(keyFn(item));
        counts[key] = (counts[key] || 0) + 1;
      });
      return counts;
    };

    const topN = (counts: Record<string, number>, n: number = 10) => {
      return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
    };

    const productViews = countBy(
      events.filter(
        (e) => e.eventType === EventType.PRODUCT_VIEW && e.productId,
      ),
      (e) => e.productId!,
    );

    return {
      topProductViews: topN(productViews, limit).map(([id, count]) => ({
        productId: Number(id),
        views: count,
      })),
    };
  }
}
