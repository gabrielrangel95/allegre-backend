import { OrganizationEntity } from '../organization.entity';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class OrganizationFindDto extends IntersectionType(
  PaginationDto,
  PartialType(PickType(OrganizationEntity, ['id', 'name', 'cnpj'])),
) {}
