import { IsHexColor, IsNotEmpty } from "class-validator";

export class CreateColorsDto {
    @IsNotEmpty()
    name: string

    @IsHexColor({ message: "Vui lòng để đúng định dạng (ví dụ: #FFF hoặc #FFFFFF)" })
    hex: string
}