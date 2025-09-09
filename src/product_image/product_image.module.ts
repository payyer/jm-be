import { Module } from '@nestjs/common';
import { ProductImageController } from './product_image.controller';
import { ProductImageService } from './product_image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImages } from './product_images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImages])],
  controllers: [ProductImageController],
  providers: [ProductImageService],
  exports: [ProductImageService]
})
export class ProductImageModule { }
