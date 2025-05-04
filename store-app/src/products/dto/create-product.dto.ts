import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  name: string;
  @Type(() => Date)
  @IsDate()
  product_date: Date;
  @Type(() => Date)
  @IsDate()
  expiration_date: Date;
  @IsInt()
  @Min(1)
  stock: number;
  @IsNumber()
  @IsPositive()
  @Min(0.1)
  price: number;
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  //user_id
  @IsOptional()
  @ValidateIf(
    (obj, value) =>
      typeof value === 'string' || value instanceof Types.ObjectId,
  )
  @IsMongoId()
  user_id?: string | Types.ObjectId;
  //user_id: string
}
