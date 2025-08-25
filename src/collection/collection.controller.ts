import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CollectionCreateDto, UpdateCollectionDto } from './dto/collectionDto';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) { }
    @Get()
    findAll() {
        return this.collectionService.findAll()
    }

    @Post()
    create(@Body() createCollectionDto: CollectionCreateDto) {
        return this.collectionService.create(createCollectionDto)
    }
    @Put()
    update(@Body() updateCollection: UpdateCollectionDto) {
        return this.collectionService.update(updateCollection)
    }
    @Delete()
    delete(@Body("id") id: string) {
        return this.collectionService.delete(id)
    }
}
