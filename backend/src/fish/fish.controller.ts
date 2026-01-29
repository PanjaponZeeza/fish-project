import { Controller, Get, Query } from '@nestjs/common';
import { FishService } from './fish.service';

@Controller('fish')
export class FishController {
  constructor(private readonly fishService: FishService) {}

  @Get()
  async getAllFish() {
    return this.fishService.findAll();
  }

  @Get('search')
  async getFishByClass(@Query('classId') classId: string) {
    return this.fishService.findByClassId(classId);
  }
}