import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export class Supply extends Document {
  @Prop({ required: true })
  date: Date
  @Prop({ required: true })
  amount: number
}
export const SupplySchema = SchemaFactory.createForClass(Supply)