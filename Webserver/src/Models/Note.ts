import {Entity, Column, OneToOne, JoinColumn} from 'typeorm';
import {WithTimeStamps} from './WithTimeStamps';
import Task from './Task';
@Entity()
export default class Note extends WithTimeStamps{
    @Column({
        length: 255
    })
    name: string;

    @Column({
        length: 255
    })
    slug: string;

    @Column({
        type: 'text'
    })
    text: string;

    @OneToOne(type => Task)
    @JoinColumn()
    task: Task;
}