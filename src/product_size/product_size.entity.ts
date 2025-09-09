import { Column, Entity, ForeignKey, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductSize {
    @PrimaryColumn('uuid')
    product_id: string

    @PrimaryColumn('uuid')
    size_id: string

    @Column({ default: 0, type: 'int' })
    stock: number
}