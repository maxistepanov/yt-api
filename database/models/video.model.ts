import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Video {
    constructor(data: any) {
        Object.assign(this, data);
    }

    @PrimaryGeneratedColumn() id!: number;

    @Column({
        length: 500,
    })
    name!: string;

    @Column({
        length: 100,
    })
    videoId!: string;

    @Column({
        type: 'simple-json',
    })
    json!: any;

    @CreateDateColumn() createdAt!: string;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: string;
}
