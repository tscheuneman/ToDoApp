import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity} from 'typeorm';

@Entity()
export class AbstractModel extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string

}