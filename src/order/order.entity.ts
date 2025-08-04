import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";

enum OrderStatus {
    PENDING = 'pending',
    SHIPPING = 'shipping',
    DELIVERED = "delivered",
    CANCEL = 'cancel'
}


@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column("uuid")
    user_id: string

    @Column()
    shipping_address: string

    @Column()
    payment_method: string

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status: OrderStatus

    @Column()
    total_price: number

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: Relation<User>;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date

}