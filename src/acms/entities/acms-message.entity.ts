import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { FaultMessage } from './fault-message.entity';

export enum AcmsMessageStatus {
    Open,
    Sending,
    Sent,
    Received,
    Failed,
    New,
}

export enum AcmsMessageDirection {
    Uplink,
    Downlink
}

@Entity()
export class AcmsMessage {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'The unique identifier of the message', example: '6571f19e-21f7-4080-b239-c9d649347101' })
    id: string;

    @CreateDateColumn()
    @ApiProperty({ description: 'The time the message was sent' })
    transmissionDate: Date;

    @CreateDateColumn()
    @ApiProperty({ description: 'The time the message was Received' })
    receptionDate: Date;

    @Column({ default: false })
    @ApiProperty({ description: 'ACID' })
    acid?: string;

    @Column()
    @ApiProperty({ description: 'The Aircraft Type', example: 'A320' })
    aircraftType: string;

    @Column()
    @ApiProperty({ description: 'Status of the communication', example: 'Received, Failed, InFlight' })
    ComStatus: string;

    @Column()
    @ApiProperty({ description: 'Status of the communication', example: 'Received, Failed, InFlight' })
    Direction: string;

    @Column()
    @ApiProperty({ description: 'Flight Number', example: 'DAL123' })
    flightNumber: string;

    @Column()
    @ApiProperty({ description: 'Tail Number', example: 'N981W' })
    tailNumber: string;

    @Column()
    @ApiProperty({ description: 'Raw Data', example: 'FSDFJEIOWJEOWIJFOEIWJFOWIEJOFIEWJo' })
    rawData: string;

    @Column()
    @ApiProperty({ description: 'Message Type', example: 'CMS' })
    messageType: string;

    @Column()
    @ApiProperty({ description: 'Message Sub Type', example: 'FM' })
    messageSubType?: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany(
        () => FaultMessage, (message: FaultMessage) => message.acmsFlight,
        {
            cascade: true,
            eager: true,
            onDelete: 'CASCADE',
        },
    )
    @ApiProperty({ description: 'The ACMS Messages associated faults', type: FaultMessage })
    faultMessages?: FaultMessage[]
}
