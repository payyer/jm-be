import { Module } from '@nestjs/common';
import { ProductSizeService } from './product_size.service';
import { ProductSizeController } from './product_size.controller';

@Module({
  providers: [ProductSizeService],
  controllers: [ProductSizeController]
})
export class ProductSizeModule {}
