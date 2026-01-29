import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'fishes' })
export class Fish extends Document {
  @Prop({ required: true })
  scientificName: string;

  @Prop()
  localName: string;

  @Prop()
  commonName: string;

  @Prop()
  family: string;

  @Prop()
  size: string;

  @Prop()
  distribution: string;

  @Prop()
  habitat: string;

  @Prop()
  remarks: string;

  @Prop()
  imageRef: string; // ชื่อไฟล์รูปภาพ

  @Prop()
  classId: string; // ชื่อ Class ที่ตรงกับใน Teachable Machine
}

export const FishSchema = SchemaFactory.createForClass(Fish);