import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fish } from './fish.schema';

@Injectable()
export class FishService {
  constructor(@InjectModel(Fish.name) private fishModel: Model<Fish>) {}

  async findAll(): Promise<Fish[]> {
    // ต้องดึงข้อมูลมาเก็บในตัวแปร data ก่อน ถึงจะ console.log ได้
    const data = await this.fishModel.find().exec(); 
    console.log('Data from DB:', data);
    return data;
  }

  async findByClassId(classId: string): Promise<Fish | null> {
    // เพิ่ม | null เพื่อให้รองรับกรณีหาปลาไม่เจอ
    const data = await this.fishModel.findOne({ classId }).exec();
    return data;
  }
}