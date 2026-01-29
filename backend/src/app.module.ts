import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FishModule } from './fish/fish.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://panjaponpuakinsang2004_db_user:Zeeza_030547@panjapon.lqlg9lt.mongodb.net/fishDB?retryWrites=true&w=majority&appName=Panjapon'
    ),
    FishModule,
  ],
})
export class AppModule {}