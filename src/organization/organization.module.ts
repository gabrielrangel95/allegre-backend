import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';

@Module({
  imports: [DatabaseModule],
  providers: [OrganizationService],
  controllers: [OrganizationController],
  exports: [OrganizationService],
})
export class OrganizationModule {}
