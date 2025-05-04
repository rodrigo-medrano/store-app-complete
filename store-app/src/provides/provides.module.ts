import { Module } from '@nestjs/common';
import { ProvidesService } from './provides.service';
import { ProvidesController } from './provides.controller';

@Module({
  controllers: [ProvidesController],
  providers: [ProvidesService],
})
export class ProvidesModule {}
