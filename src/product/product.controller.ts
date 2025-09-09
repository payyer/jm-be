import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }
    @Post()
    @UseInterceptors(FilesInterceptor("images"))
    create(
        @Body() createProductDto: CreateProductDto,
        @UploadedFiles() images: Express.Multer.File[]
    ) {
        return this.productService.create(createProductDto, images)
    }
}
