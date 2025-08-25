import { IsNotEmpty } from "class-validator";

export class CollectionCreateDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    image: string
}

export class UpdateCollectionDto {
    @IsNotEmpty()
    id: string

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    image: string
}