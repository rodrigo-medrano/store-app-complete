import { Injectable } from '@nestjs/common';
import { CreateProvideDto } from './dto/create-provide.dto';
import { UpdateProvideDto } from './dto/update-provide.dto';

@Injectable()
export class ProvidesService {
  create(createProvideDto: CreateProvideDto) {
    return 'This action adds a new provide';
  }

  findAll() {
    return `This action returns all provides`;
  }

  findOne(id: number) {
    return `This action returns a #${id} provide`;
  }

  update(id: number, updateProvideDto: UpdateProvideDto) {
    return `This action updates a #${id} provide`;
  }

  remove(id: number) {
    return `This action removes a #${id} provide`;
  }
}
