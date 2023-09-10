import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization';

@Module({
  imports: [OrganizationModule],
})
export class AppModule {}
