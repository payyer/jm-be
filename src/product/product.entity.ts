import { Category } from "src/category/category.entity";
import { Collection } from "src/collection/collection.entity";
import { Colors } from "src/color/color.entity";
import { ProductColor } from "src/product_color/product_color.entity";
import { ProductImages } from "src/product_image/product_images.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, Relation } from "typeorm";

@Entity()
export class Product {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    collection_id: string

    @Column()
    category_id: string

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    information: string;

    @ManyToOne(() => Collection, (collection) => collection.id)
    @JoinColumn({ name: 'collection_id' })
    collection: Collection

    @ManyToOne(() => Category, category => category.id)
    @JoinColumn({ name: "category_id" })
    category: Category

    @OneToMany(() => ProductColor, productColor => productColor.product_id)
    productColors: Relation<ProductColor>[]

    @OneToMany(() => Colors, color => color.id)
    colors: Relation<Colors>[]

    @OneToMany(() => ProductImages, productImage => productImage.product_id)
    productImages: Relation<ProductImages>[]
}