import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrganizationEntity } from '../organization.entity';
import { PickType } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class OrganizationUpdateDto extends PickType(OrganizationEntity, [
  'logoUrl',
  'phone',
]) {
  @ApiPropertyOptional({
    description: 'Organization Name',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    description: 'CNPJ number, without special characters',
  })
  @IsOptional()
  @Length(14) //00 000 000 0000 00
  @IsString()
  cnpj: string;
}
