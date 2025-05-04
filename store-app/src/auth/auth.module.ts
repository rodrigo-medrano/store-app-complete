import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [
    PassportModule, // Exporta PassportModule para otros módulos
    JwtModule, // Exporta JwtModule para otros módulos
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    /* JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h'
      }
    }) */


    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    })
  ],
  // exports: [JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule { }
