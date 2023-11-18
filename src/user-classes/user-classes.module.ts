import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserClassesService } from './user-classes.service';
import { UserClassesController } from './user-classes.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserClassesService],
  controllers: [UserClassesController],
  exports: [UserClassesService],
})
export class UserClassesModule {}
