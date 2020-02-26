import {Entity, Column} from 'typeorm';
import {AbstractModel} from './AbstractModel';

@Entity()
export class User extends AbstractModel{

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

}