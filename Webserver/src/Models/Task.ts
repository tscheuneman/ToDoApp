import {Entity, Column, OneToOne, JoinColumn} from 'typeorm';
import {WithTimeStamps} from './WithTimeStamps';
import Category from './Category';
@Entity()
export default class Task extends WithTimeStamps{

    @Column({
        length: 255
    })
    name: string;

    @Column({
        type: 'text'
    })
    text: string;

    @OneToOne(type => Category)
    @JoinColumn()
    category: Category;
}