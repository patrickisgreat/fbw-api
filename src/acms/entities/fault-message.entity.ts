import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AcmsMessage } from './acms-message.entity';

@Entity()
export class FaultMessage {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'The unique identifier of the fault', example: '6571f19e-21f7-4080-b239-c9d649347101' })
    id: string;

    @CreateDateColumn()
    @ApiProperty({ description: 'Date the Fault Occurred' })
    eventDate: Date;

    @Column()
    @ApiProperty({ description: 'Source of Fault', example: 'BMC 2' })
    source: string;

    @Column({ default: false })
    @ApiProperty({ description: 'Flight Phase where Fault Occurred', example: 5 })
    flightPhase: number;

    @Column()
    @ApiProperty({ description: 'Type of Fault', example: 'INTERMITTENT' })
    type: string;

    @Column()
    @ApiProperty({ description: 'C2Afect', example: false })
    c2Afect: boolean;

    @Column()
    @ApiProperty({ description: 'Class Number', example: 1 })
    classNumber: number;

    @Column()
    @ApiProperty({ description: 'Identifiers', example: '[ID 1, ID 2]' })
    identifiers: string;

    @Column()
    @ApiProperty({ description: 'Flight Number', example: 'DAL213' })
    flightNumber: string;

    @Column()
    @ApiProperty({ description: 'Tail Number', example: 'N981W' })
    tailNumber: string;

    @Column()
    @ApiProperty({ description: 'Text of Fault', example: 'SNAKES ON PLANE' })
    text: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ManyToOne((type) => AcmsMessage, (message) => message.faultMessages)
    acmsFlight: AcmsMessage;

    @Column()
    @ApiProperty({ description: 'Associated MSFS LVAR name', example: 'A:32NX_BRAKES_HOT' })
    lVarName: string;

    @Column()
    @ApiProperty({ description: 'Associated MSFS LVAR value', example: true })
    lVarValue: boolean;
}
