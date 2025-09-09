import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateProductImagesDto {
    @IsNotEmpty()
    product_id: string

    @IsNotEmpty()
    color_id: string

    @IsNotEmpty()
    public_id: string

    @IsNotEmpty()
    image_url: string

    @IsOptional()
    is_main: boolean
}