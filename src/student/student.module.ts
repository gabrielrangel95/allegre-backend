import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [DatabaseModule],
  providers: [StudentService],
  controllers: [StudentController],
  exports: [StudentService],
})
export class StudentModule {}
