import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductImages } from './product_images.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductImagesDto } from './product_images_dto';

@Injectable()
export class ProductImageService {
    constructor(
        @InjectRepository(ProductImages)
        private readonly productImageRepository: Repository<ProductImages>
    ) { }

    async create(createProductImagesDto: CreateProductImagesDto) {
        // const result = await this.productImageRepository
    }
}
