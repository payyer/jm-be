import { User } from "src/user/user.entity";
import { Column, Entity, ForeignKey, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    cart: Relation<User>
}