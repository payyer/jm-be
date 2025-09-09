import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Size {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    // @OneToMany(() )
}