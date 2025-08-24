import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryServices: CategoryService) { }
    @Post()
    create(@Body("name") name: string) {
        return this.categoryServices.create(name)
    }
}
