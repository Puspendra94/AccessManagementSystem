import { IsDefined, IsInt, IsPositive, IsString } from "class-validator";

export class CreateKeyDto {

    @IsDefined()
    @IsString()
    public key: string;

    @IsDefined()
    @IsInt()
    @IsPositive()
    public expiryInMs: number;

    @IsDefined()
    @IsInt()
    @IsPositive()
    public ttl: number;
}
