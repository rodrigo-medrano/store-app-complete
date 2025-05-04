import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, user: User) {
    createProductDto.name = createProductDto.name.toLocaleLowerCase();
    createProductDto.user_id = user.id;

    try {
      const product = await this.productModel.create(createProductDto);
      return product;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.productModel
      .find()

      .limit(limit)
      .skip(offset)
      .sort({
        name: 1,
      })
      .select('-__v');
  }

  async findOne(id: string) {
    let product: Product;
    //Buscar MongoID
    if (isValidObjectId(id)) {
      product = await this.productModel.findById(id);
    }

    //Buscar name
    if (!product) {
      product = await this.productModel.findOne({
        name: id.toLocaleLowerCase().trim(),
      });
    }

    if (!product) {
      throw new NotFoundException(`Producto con id, name No "${id}" not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (updateProductDto.name) {
      updateProductDto.name = updateProductDto.name.toLocaleLowerCase();

      try {
        await product.updateOne(updateProductDto);
        return { ...product.toJSON, ...updateProductDto };
      } catch (error) {
        this.handleExceptions(error);
      }
    }
  }

  async remove(id: string) {
    //const product = await this.findOne(id)
    //await product.deleteOne()
    //return

    const { deletedCount } = await this.productModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Product con id "${id}" not foud`);
    }
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Producto existe en BD ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `No se puede crear el producto: verifique los registros del servidor`,
    );
  }
}
