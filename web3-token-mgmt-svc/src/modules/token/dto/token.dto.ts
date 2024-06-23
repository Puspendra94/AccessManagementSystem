import { IsDefined, IsInt, IsOptional, IsPositive, IsString } from "class-validator";
import { TokenEntity } from "../entities/token.entity";
import { AbstractDto } from "../../../common/dto/abstract.dto";

export class TokenDto extends AbstractDto {
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

    @IsOptional()
    @IsInt()
    public attempts: number;

    @IsOptional()
    public lastAttemptAt: Date;

    constructor(tokenEntity: TokenEntity) {
        super();
        this.key = tokenEntity.key;
        this.limit = tokenEntity.limit;
        this.ttl = tokenEntity.ttl;
        this.attempts = tokenEntity.attempts;
        this.lastAttemptAt = tokenEntity.lastAttemptAt;
    }
}