import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ClassService],
  controllers: [ClassController],
  exports: [ClassService],
})
export class ClassModule {}
