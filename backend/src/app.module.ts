import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, PrismaModule, ProductsModule, AnalyticsModule, UsersModule],
})
export class AppModule {}

