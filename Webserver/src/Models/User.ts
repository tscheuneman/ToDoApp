import {Entity, Column, OneToMany} from 'typeorm';
import {WithTimeStamps} from './WithTimeStamps';
import Category from './Category';

@Entity()
export default class User extends WithTimeStamps{
    @Column({
        length: 255,
        unique: true
    })
    username: string;

    @Column({
        length: 255,
        unique: true
    })
    userHash: string;

    @Column({
        length: 255,
        nullable: true
    })
    thirdPartyID: string;


    @Column({
        length: 255,
        nullable: true
    })
    password: string; 

    @OneToMany(type => Category, category => category.user)
    categories: Category[];
}