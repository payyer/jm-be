import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsOptional({ message: "Cần truyền UUID" })
    collection_id: string

    @IsNotEmpty({ message: "Cần truyền UUID" })
    category_id: string

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    information: string
}