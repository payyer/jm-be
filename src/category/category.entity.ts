import { Product } from "src/product/product.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @OneToMany(() => Product, (product) => product.category)
    products: Relation<Product>[]
}