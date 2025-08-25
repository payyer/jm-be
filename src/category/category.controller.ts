import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/categoryDto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryServices: CategoryService) { }

    @Get()
    findAll() {
        return this.categoryServices.findAll()
    }

    @Post()
    create(@Body("name") name: string) {
        return this.categoryServices.create(name)
    }

    @Put()
    update(@Body() updateCategory: UpdateCategoryDto) {
        return this.categoryServices.update(updateCategory)
    }

    @Delete()
    delete(@Body("id") id: string) {
        return this.categoryServices.delete(id)
    }
}
