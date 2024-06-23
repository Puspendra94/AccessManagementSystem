import { IsDefined, IsInt, IsPositive, IsString } from "class-validator";
import { AbstractDto } from "../../../../src/common/dto/abstract.dto";
import { KeyEntity } from "../entities/key.entity";

export class KeyDto extends AbstractDto {
    @IsDefined()
    @IsString()
    public key: string;

    @IsDefined()
    @IsInt()
    @IsPositive()
    public limit: number;

    @IsDefined()
    @IsInt()
    @IsPositive()
    public ttl: number;

    constructor(keyEntity: KeyEntity) {
        super();
        this.key = keyEntity.key;
        this.limit = keyEntity.limit;
        this.ttl = keyEntity.ttl;
    }
}