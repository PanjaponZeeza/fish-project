import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FishController } from './fish.controller';
import { FishService } from './fish.service';
import { Fish, FishSchema } from './fish.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Fish.name, schema: FishSchema }])
  ],
  controllers: [FishController],
  providers: [FishService],
})
export class FishModule {}