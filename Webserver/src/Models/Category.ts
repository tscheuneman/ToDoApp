import {Entity, Column, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import {WithTimeStamps} from './WithTimeStamps';
import Task from './Task';
@Entity()
export default class Category extends WithTimeStamps{

    @Column({
        length: 255
    })
    name: string;

    @Column({
        length: 255
    })
    slug: string;

    @Column({
        length: 32
    })
    user: string;

    @OneToMany(type => Task, task => task.category)
    notes: Task[];

}