import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export class Category extends Document {
  @Prop({
    required: true
  })
  name: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)