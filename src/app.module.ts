import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DEV_HOST_PG'),
        port: configService.get<number>('DEV_PORT_PG'),
        username: configService.get<string>('DEV_USER_PG'),
        password: configService.get<string>('DEV_PASSWORD_PG'),
        database: configService.get<string>('DEV_DATABASE_PG'),
        entities: [__dirname + '/**/*.entity{.ts,.js}',],
        synchronize: true,
        autoLoadEntities: true
      }),
    }),
    UserModule,
    CartModule,
    AuthModule,
    EmailModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
