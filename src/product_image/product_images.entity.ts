import { Colors } from "src/color/color.entity";
import { Product } from "src/product/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class ProductImages {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product_id: string;

    @Column()
    color_id: string;

    @Column()
    public_id: string

    @Column()
    image_url: string;

    @Column({ default: false })
    is_main: boolean

    @ManyToOne(() => Product, product => product.id)
    @JoinColumn({ name: 'product_id' })
    product: Relation<Product>;

    @ManyToOne(() => Colors, product => product.id)
    @JoinColumn({ name: 'color_id' })
    colors: Relation<Colors>;
}