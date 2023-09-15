import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StudentClassesService } from './student-classes.service';
import { StudentClassesController } from './student-classes.controller';

@Module({
  imports: [DatabaseModule],
  providers: [StudentClassesService],
  controllers: [StudentClassesController],
  exports: [StudentClassesService],
})
export class StudentClassesModule {}
