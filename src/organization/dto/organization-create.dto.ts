import { IsString, IsUrl, IsOptional, Length } from 'class-validator';

export class OrganizationCreateDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  logoUrl: string;

  @Length(14) //00 000 000 0000 00
  @IsString()
  cnpj: string;

  @Length(13) // 55 00 0 00000000
  @IsOptional()
  @IsString()
  phone: string;
}
