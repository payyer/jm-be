import { Order } from "src/order/order.entity";
import { Product } from "src/product/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";

@Entity()
export class OrderItem {
    @PrimaryColumn()
    order_id: string;

    @PrimaryColumn()
    product_id: string;

    @Column()
    name: string

    @Column()
    thumb: string

    @Column()
    quantity: number;

    @Column()
    price: number;

    @ManyToOne(() => Order, (order) => order.id)
    @JoinColumn({ name: "order_id" })
    order: Relation<Order>;

    @ManyToOne(() => Product, (product) => product.id)
    @JoinColumn({ name: "product_id" })
    product: Relation<Product>;
}