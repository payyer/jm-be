import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Colors } from './color.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateColorsDto } from './colors.dto';

@Injectable()
export class ColorService {
    constructor(
        @InjectRepository(Colors)
        private readonly colorsRepository: Repository<Colors>
    ) { }

    async create(createColors: CreateColorsDto) {
        await this.colorsRepository.insert(createColors)
        return { message: "Tạo mới màu thành công" }
    }

    async findAll() {
        return await this.colorsRepository.find()
    }
}
