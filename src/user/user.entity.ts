import { Order } from "src/order/order.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({ unique: true })
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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date
}

