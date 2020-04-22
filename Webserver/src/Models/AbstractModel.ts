import {PrimaryColumn, BeforeInsert, BaseEntity} from 'typeorm';
import {v4 as uuid} from "uuid";
export abstract class AbstractModel extends BaseEntity{

    @PrimaryColumn()
    id: string;

    @BeforeInsert()
    private beforeInsert() {
        this.id = uuid();
    }

}