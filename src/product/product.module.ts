import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Category } from 'src/category/category.entity';
import { Collection } from 'src/collection/collection.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ProductImages } from 'src/product_image/product_images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Collection, ProductImages]), CloudinaryModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule { }
