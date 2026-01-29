import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // ลบ NestApplication ออก ให้เหลือแค่ AppModule
  const app = await NestFactory.create(AppModule);
  
  // เปิด CORS แบบนี้ชัวร์กว่าครับ
  app.enableCors();
  
  // ระบุ Port สำหรับ Server
  await app.listen(process.env.PORT || 3000);
}
bootstrap();