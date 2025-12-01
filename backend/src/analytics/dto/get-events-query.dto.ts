import { IsOptional, IsString, IsNumber, IsEnum, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EventType } from './create-analytics-event.dto';

export class GetEventsQueryDto {
  @IsOptional()
  @IsEnum(EventType)
  eventType?: EventType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  productId?: number;
}

