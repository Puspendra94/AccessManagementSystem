import { IsDate, IsDefined, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AbstractDto {
    /**
     * id
     * @type {string}
     * @memberof AbstractDto
     */
    @IsDefined()
    @IsUUID()
    @ApiProperty({
        description: 'UUID of the entry',
        type: String,
        format: 'uuid',
    })
    public id: string;

    /**
     * createdAt
     * @type {string}
     * @memberof AbstractDto
     */
    @IsDefined()
    @IsDate()
    @ApiProperty({
        description: 'Creation time',
        type: String,
        format: 'date-time',
    })
    public createdAt?: Date;

    /**
     * updatedAt
     * @type {Date}
     * @memberof AbstractDto
     */
    @IsDefined()
    @IsDate()
    @ApiProperty({
        description: 'Last update time',
        type: String,
        format: 'date-time',
    })
    public updatedAt?: Date;

    /**
     * deletedAt
     * @type {Date}
     * @memberof AbstractDto
     */
    @IsDefined()
    @IsDate()
    @ApiProperty({
        description: 'Deletion time',
        type: String,
        format: 'date-time',
    })
    public deletedAt?: Date;
}