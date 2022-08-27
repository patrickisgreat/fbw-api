import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAcmsMessageDto {
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

    @IsOptional()
    @ApiProperty({ description: 'Raw Data', example: 'test' })
    rawData: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Message Type', example: 'CMS' })
    messageType: string;

    @IsOptional()
    @ApiProperty({ description: 'Message Sub Type', example: 'FM' })
    messageSubType: string;
}
