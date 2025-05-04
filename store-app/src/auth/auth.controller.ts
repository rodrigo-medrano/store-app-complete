import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './decorators/role-protected.decorator';
import { UserRoleGuard } from './guards/user-role.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(200) // MODIFICADO
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('public')
  testingPublicRouter() {
    return {
      ok: true,
      message: 'Ruta publica para prueba',
    };
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRouter() {
    return {
      ok: true,
      message: 'Ruta Privada',
    };
  }

  @Get('private2')
  @RoleProtected(ValidRoles.admin, ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
