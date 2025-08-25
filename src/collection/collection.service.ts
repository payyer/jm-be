import { BadRequestException, Injectable } from '@nestjs/common';
import { CollectionCreateDto, UpdateCollectionDto } from './dto/collectionDto';
import { Repository } from 'typeorm';
import { Collection } from './collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getFiledUpdate } from 'src/utils/getFiledUpdate';

@Injectable()
export class CollectionService {
    constructor(
        @InjectRepository(Collection)
        private readonly collectionRepository: Repository<Collection>
    ) { }

    async findAll() {
        return this.collectionRepository.find();
    }

    async create(collectionCreateDto: CollectionCreateDto) {
        const isDuplicate = await this.collectionRepository.findOne({ where: { name: collectionCreateDto.name } })
        if (isDuplicate) throw new BadRequestException("Bộ sưu tập đã tồn tại")
        const collection = await this.collectionRepository.create(collectionCreateDto)
        await this.collectionRepository.save(collection)
        return collection
    }

    async update(updateCollectionDto: UpdateCollectionDto) {
        const { id, ...updateData } = updateCollectionDto
        const result = await this.collectionRepository.update(id, updateData)
        if (result.affected === 0) throw new BadRequestException("Không tìm thấy bộ sưu tập cần xóa")
        return { message: "Update thành công" }
    }

    async delete(id: string) {
        const result = await this.collectionRepository.delete(id)
        if (result.affected === 0) throw new BadRequestException("Không tìm thấy danh mục cần xóa")
        return result
    }
}
