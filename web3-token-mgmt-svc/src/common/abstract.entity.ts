import { Column, DeleteDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { AbstractDto } from "./dto/abstract.dto";

export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP', update: false })
    public createdAt?: Date;

    @Column({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', update: true })
    public updatedAt?: Date;

    @DeleteDateColumn()
    public deletedAt?: Date;

    public abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

    public toDto(options?: Record<string, any>): any {
        return this.toDto(this.dtoClass);
    }
}