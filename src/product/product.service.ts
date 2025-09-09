import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './product.dto';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { Collection } from 'src/collection/collection.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductImages } from 'src/product_image/product_images.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,

        @InjectRepository(ProductImages)
        private readonly productImages: Repository<ProductImages>,

        @InjectRepository(Collection)
        private readonly collectionRepository: Repository<Collection>,

        private readonly cloudinaryService: CloudinaryService
    ) { }
    async create(createProductDto: CreateProductDto, images: Express.Multer.File[]) {
        const category = await this.categoryRepository.findOne({ where: { id: createProductDto.category_id } })
        if (!category) throw new BadRequestException("Danh mục không tồn tại, vui lòng thử lại")

        let collection: Collection | null = null
        if (createProductDto.collection_id) {
            collection = await this.collectionRepository.findOne({ where: { id: createProductDto.collection_id } })
            if (!collection) throw new BadRequestException("Bộ sưu tập không tồn tại, vui lòng thử lại!")
        }

        const dtoProduct = this.productRepository.create({ ...createProductDto })
        const product = await this.productRepository.save(dtoProduct)

        // const imagesProduct = await this.cloudinaryService.uploadFiles(images)
        // if (!imagesProduct) throw new BadRequestException("Upload ảnh thất bại, vui lòng thử lại!")
        // imagesProduct.forEach(async (img, index) => {
        //     let isMain = false
        //     if (index === 0) {
        //         isMain = true
        //     }
        //     const productImage = this.productImages.create({ product_id: product.id, image_url: img.url, public_id: img.public_id, is_main: isMain })
        //     await this.productImages.save(productImage)
        // })
        return product
    }
}
