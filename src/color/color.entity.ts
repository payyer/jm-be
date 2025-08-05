import { ProductColor } from "src/product_color/product_color.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Colors {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string

    @Column()
    hex: string

    @OneToMany(() => ProductColor, productColor => productColor.color_id)
    productColors: Relation<ProductColor>[]
}