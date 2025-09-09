import { Body, Controller, Get, Post } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorsDto } from './colors.dto';

@Controller('color')
export class ColorController {
    constructor(private readonly colorService: ColorService) { }

    @Get()
    findAll() {
        return this.colorService.findAll()
    }

    @Post()
    create(@Body() createColorDto: CreateColorsDto) {
        return this.colorService.create(createColorDto)
    }
}
