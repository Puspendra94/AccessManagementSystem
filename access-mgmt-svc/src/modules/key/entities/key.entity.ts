import { AbstractEntity } from "../../../../src/common/abstract.entity";
import { Column, Entity } from "typeorm";
import { KeyDto } from "../dto/key.dto";

@Entity({ name: "key" })    
export class KeyEntity extends AbstractEntity<KeyDto> {
    
    @Column({ nullable: false, comment: "key which identifies the access" })
    public key: string;

    @Column({ nullable: false, comment: "number of attempts before it expires" })
    public limit: number;

    @Column({ nullable: false, comment: "time to live in ms" })
    public ttl: number;

    public dtoClass = KeyDto;
}
