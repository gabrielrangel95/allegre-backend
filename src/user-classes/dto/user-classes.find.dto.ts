import { UserClassesEntity } from '../user-classes.entity';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class UserClassesFindDto extends IntersectionType(
  PaginationDto,
  PartialType(PickType(UserClassesEntity, ['id', 'classId', 'userId'])),
) {}
