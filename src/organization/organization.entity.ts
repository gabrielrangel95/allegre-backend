import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Organization as OrganizationModel } from '@prisma/client';
import { IsString, IsUrl, IsOptional, Length, IsUUID } from 'class-validator';

export class OrganizationEntity implements OrganizationModel {
  @ApiPropertyOptional({
    description: 'UUID generated',
    example: 'abb5a63d-0319-4b11-8380-4c82beecacc4',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Organization Name',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Organization logo url',
  })
  @IsOptional()
  @IsUrl()
  logoUrl: string;

  @ApiProperty({
    description: 'CNPJ number, without special characters',
  })
  @Length(14) //00 000 000 0000 00
  @IsString()
  cnpj: string;

  @ApiPropertyOptional({
    description: 'Organization Phone,  without special characters',
  })
  @Length(13) // 55 00 0 00000000
  @IsOptional()
  @IsString()
  phone: string;
}
