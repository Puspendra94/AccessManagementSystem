import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class UpdateKeyDto {
    @IsOptional()
    @IsInt()
    @IsPositive()
    public expiryInMs: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    public ttl: number;
}
