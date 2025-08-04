import { Product } from "src/product/product.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    icon: string

    @OneToMany(() => Product, (product) => product.category)
    products: Product[]
}