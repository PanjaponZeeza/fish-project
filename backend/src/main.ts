import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(NestApplication, {
    // เปิดใช้งาน CORS เพื่อให้ Frontend เข้าถึงได้
    cors: true, 
  });
  
  // สำคัญ: ต้องระบุ Port ให้ยืดหยุ่นสำหรับ Server
  await app.listen(process.env.PORT || 3000);
}
bootstrap();