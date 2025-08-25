import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/categoryDto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }
    async findAll() {
        return this.categoryRepository.find();
    }

    async create(name: string) {
        const isDuplicate = await this.categoryRepository.findOne({ where: { name } })
        if (isDuplicate) throw new BadRequestException("Danh mục đã tồn tại")
        const category = new Category()
        category.name = name
        const result = await this.categoryRepository.save(category);
        return result
    }

    async update(categoryDto: UpdateCategoryDto) {
        const category = await this.categoryRepository.update(categoryDto.id, { name: categoryDto.name })
        return category
    }

    async delete(id: string) {
        const category = await this.categoryRepository.findOne({ where: { id } })
        if (!category) throw new BadRequestException("Không tìm thấy danh mục cần xóa")
        await this.categoryRepository.delete(category)
        return { message: "Xóa thành công" }
    }
}
