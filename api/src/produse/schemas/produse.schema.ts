import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProduseDocument = Produse & Document;

@Schema()
export class Produse {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  code: string;
  @Prop({ required: true })
  weight: number;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  color: string;
  @Prop({ required: true })
  isDeleted: boolean;
}

export const ProduseSchema = SchemaFactory.createForClass(Produse);
