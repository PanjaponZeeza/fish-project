import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // เพิ่มบรรทัดนี้เพื่อปลดล็อกให้ Next.js เข้าถึง API ได้
  app.enableCors(); 
  
  await app.listen(3000);
}
bootstrap();