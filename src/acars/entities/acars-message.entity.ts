import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// TODO: setup relationships and figure out more ACARS fields
export class AcarsMessage {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'The unique identifier of the message', example: '6571f19e-21f7-4080-b239-c9d649347101' })
    id: string;

    @CreateDateColumn()
    @ApiProperty({ description: 'The time the message was sent' })
    transmissionDate: Date;

    @CreateDateColumn()
    @ApiProperty({ description: 'The time the message was Received' })
    receptionDate: Date;

    @Column()
    @ApiProperty({ description: 'Flight Number', example: 'DAL123' })
    flightNumber: string;

    @Column()
    @ApiProperty({ description: 'Tail Number', example: 'N981W' })
    tailNumber: string;
}
