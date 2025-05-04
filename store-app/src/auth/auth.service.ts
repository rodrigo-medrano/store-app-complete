import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      return {
        user,
        token: this.getJwtToken({ email: user.email }),
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userModel
      .findOne({ email })
      .select('email password fullName rol'); // MODIFICADO
    if (!user)
      throw new UnauthorizedException(
        'Las Credenciales no son validas (email)',
      );

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(
        'Las Credenciales no son validas (password)',
      );

    return {
      email: user.email,
      fullName: user.fullName,
      rol: user.rol,
      token: this.getJwtToken({ email: user.email }),
    };
  }

  //JwT
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `El campo ya existe en BD ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `No se puede prosesar la solicitud: Consulte los registros del servidor`,
    );
  }
}
