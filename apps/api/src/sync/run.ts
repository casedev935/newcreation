import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SyncService } from './sync.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const syncService = app.get(SyncService);
  
  await syncService.syncHomilies();
  
  await app.close();
}
bootstrap();
