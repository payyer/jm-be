import { Product } from "src/product/product.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Collection {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    image: string;

    @OneToMany(() => Product, (product) => product.collection)
    products: Product[]
}