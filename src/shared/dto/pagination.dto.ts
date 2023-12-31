import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({ example: 20 })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  take: number;

  @ApiPropertyOptional({ example: 20 })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  skip: number;
}
