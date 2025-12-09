import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [ConfigModule, PrismaModule, ProductsModule, AnalyticsModule, UsersModule, AuthModule, PurchaseModule],
  providers: [AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}

