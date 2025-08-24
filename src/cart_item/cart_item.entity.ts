import { Cart } from "src/cart/cart.entity";
import { Product } from "src/product/product.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Relation } from "typeorm";

@Entity()
export class CartItem {
    @PrimaryColumn('uuid')
    cart_id: string

    @PrimaryColumn('uuid')
    product_id: string

    @ManyToOne(type => Cart, cart => cart.id)
    @JoinColumn({ name: 'cart_id' })
    cart: Relation<Cart>

    @ManyToOne(type => Product, product => product.id)
    @JoinColumn({ name: 'product_id' })
    product: Relation<Product>
}