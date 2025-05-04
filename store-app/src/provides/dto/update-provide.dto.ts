import { PartialType } from '@nestjs/mapped-types';
import { CreateProvideDto } from './create-provide.dto';

export class UpdateProvideDto extends PartialType(CreateProvideDto) {}
