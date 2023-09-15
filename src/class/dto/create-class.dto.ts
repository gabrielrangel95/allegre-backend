import { ClassEntity } from '../class.entity';
import { PickType } from '@nestjs/swagger';

export class ClassCreateDto extends PickType(ClassEntity, [
  'name',
  'logoUrl',
]) {}
