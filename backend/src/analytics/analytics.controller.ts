import { Controller, Post, Get, Body, Query, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsEventDto } from './dto/create-analytics-event.dto';
import { GetEventsQueryDto } from './dto/get-events-query.dto';

@ApiTags('analytics')
@Controller('api/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('track')
  @ApiOperation({ summary: 'Enregistrer un événement analytics' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "L'événement a été enregistré avec succès.",
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        eventId: { type: 'string', example: 'abc123def456' },
      },
    },
  })
  @ApiBody({ type: CreateAnalyticsEventDto })
  async track(@Body() createEventDto: CreateAnalyticsEventDto) {
    const event = await this.analyticsService.trackEvent(createEventDto);
    return { success: true, eventId: event.id };
  }

  @Get('events')
  @ApiOperation({ summary: 'Récupérer les événements analytics' })
  @ApiQuery({
    name: 'eventType',
    required: false,
    enum: ['product_view', 'add_to_cart', 'search', 'purchase'],
    description: "Filtrer par type d'événement",
  })
  @ApiQuery({
    name: 'productId',
    required: false,
    type: Number,
    description: 'Filtrer par ID de produit',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des événements analytics.',
  })
  async getEvents(@Query() query: GetEventsQueryDto) {
    return this.analyticsService.getEvents({
      eventType: query.eventType,
      productId: query.productId,
    });
  }

  @Get('stats')
  @ApiOperation({ summary: 'Récupérer les statistiques agrégées' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Statistiques analytics agrégées.',
  })
  async getStats() {
    return this.analyticsService.getStats();
  }
}
