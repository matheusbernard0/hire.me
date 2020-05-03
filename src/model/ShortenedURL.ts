import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({
    name:'shortened'
})
export class ShortenedURL{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'url',
        nullable: false,
    })
    url: string;

    @Column({
        name: 'alias',
        nullable: false,
    })
    alias: string;

    @Column({
        name: 'visits',
        nullable: false,
        default: 0,
    })
    visits: number;
}
