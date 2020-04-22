import {Entity, Column, OneToMany} from 'typeorm';
import {WithTimeStamps} from './WithTimeStamps';
import Category from './Category';

@Entity()
export default class User extends WithTimeStamps{
    @Column({
        length: 255
    })
    username: string;

    @Column({
        length: 255
    })
    email: string;

    @Column({
        length: 255
    })
    password: string; 

    @OneToMany(type => Category, category => category.user)
    categories: Category[];
}