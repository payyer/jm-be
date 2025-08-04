import { Colors } from "src/color/color.entity";
import { Product } from "src/product/product.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class ProductColor {
    @PrimaryColumn('uuid')
    product_id: string;

    @PrimaryColumn('uuid')
    color_id: string;

    @ManyToOne(() => Product, product => product.id)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @ManyToOne(() => Colors, color => color.id)
    @JoinColumn({ name: 'color_id' })
    colors: Colors;
}