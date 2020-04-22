import {Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn} from 'typeorm';
import Task from './Task';
import { AbstractModel } from './AbstractModel';
@Entity()
export default class Scheduler extends AbstractModel {
    @Column({
        length: 255
    })
    name: string;

    @Column({
        type: process.env.DB_TYPE === 'postgres' ? 'timestamp without time zone' : 'datetime'
    })
    date: string;

    @OneToOne(type => Task)
    @JoinColumn()
    task: Task;
}