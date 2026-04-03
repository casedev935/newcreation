import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SyncModule } from './sync/sync.module';
import { HomiliesModule } from './homilies/homilies.module';

@Module({
  imports: [PrismaModule, SyncModule, HomiliesModule],
})
export class AppModule {}
