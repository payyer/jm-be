import { Cart } from "src/cart/cart.entity";
import { Order } from "src/order/order.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    cart_id: string

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    phone: string

    @Column()
    password: string;

    @Column()
    address: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole

    @OneToMany(() => Order, (order) => order.user)
    orders: Relation<Order>[];

    @OneToOne(() => Cart)
    @JoinColumn({ name: 'cart_id' })
    cart: Cart

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date
}

