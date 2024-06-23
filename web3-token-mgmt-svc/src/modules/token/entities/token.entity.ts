import { Column, Entity } from "typeorm";
import { TokenDto } from "../dto/token.dto";
import { AbstractEntity } from "src/common/abstract.entity";

@Entity({ name: "token" })
export class TokenEntity extends AbstractEntity<TokenDto> {
    @Column({ nullable: false, comment: "key which identifies the access" })
    public key: string;

    @Column({ nullable: false, comment: "number of attempts before it expires" })
    public limit: number;

    @Column({ nullable: false, comment: "time to live in ms" })
    public ttl: number;

    @Column({ nullable: true, comment: "number of attempts before it expires", type: 'int', default: 0 })
    public attempts: number;

    @Column({ nullable: true, comment: "expiry date", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public lastAttemptAt: Date;

    public dtoClass = TokenDto;
}
