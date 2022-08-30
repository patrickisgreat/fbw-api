import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { FaultMessage } from '../entities/fault-message.entity';

export class UpdateAcmsMessageDto {
    @IsOptional()
    @ApiProperty({ description: 'Database ID' })
    id: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Date the Message Was Sent' })
    transmissionDate: Date;

    @IsNotEmpty()
    @ApiProperty({ description: 'The time the message was Received' })
    receptionDate: Date;

    @IsOptional()
    @ApiProperty({ description: 'ACID' })
    acid: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'The Aircraft Type', example: 'A320' })
    aircraftType: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Flight Number', example: 'DAL123' })
    flightNumber: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Tail Number', example: 'N981W' })
    tailNumber: string;

    @IsOptional()
    @ApiProperty({ description: 'Raw Data', example: 'test' })
    rawData: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Message Type', example: 'CMS' })
    messageType: string;

    @IsOptional()
    @ApiProperty({ description: 'Message Sub Type', example: 'FM' })
    messageSubType: string;

    @IsOptional()
    @ApiProperty({ description: 'Fault Messages', type: FaultMessage })
    faultMessages: FaultMessage[];
}
