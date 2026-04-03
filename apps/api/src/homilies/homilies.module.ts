import { Module } from '@nestjs/common';
import { HomiliesService } from './homilies.service';
import { HomiliesController } from './homilies.controller';

@Module({
  controllers: [HomiliesController],
  providers: [HomiliesService]
})
export class HomiliesModule {}
