import { IsNotEmpty, IsNumber, IsString } from "class-validator"

class ContactDto {
  @IsNumber()
  @IsNotEmpty()
  cell_phone: number
  @IsString()
  @IsNotEmpty()
  email: string
  @IsString()
  @IsNotEmpty()
  adrres: string
}

export class CreateProvideDto {
  @IsString()
  @IsNotEmpty()
  name: string
  @IsString()
  @IsNotEmpty()
  lastname: string
  @IsNotEmpty()
  contact: ContactDto
}
