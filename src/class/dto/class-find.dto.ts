import { ClassEntity } from '../class.entity';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class ClassFindDto extends IntersectionType(
  PaginationDto,
  PartialType(PickType(ClassEntity, ['id', 'name', 'organizationId'])),
) {}
