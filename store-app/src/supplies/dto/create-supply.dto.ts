import { IsDate, IsNotEmpty, IsNumber } from "class-validator"

export class CreateSupplyDto {
  @IsDate()
  @IsNotEmpty()
  date: Date
  @IsNumber()
  @IsNotEmpty()
  amount: number
}
