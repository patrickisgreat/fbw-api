import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateFaultMessageDto {
    @IsOptional()
    @ApiProperty({ description: 'Associated MSFS LVAR', example: 'L:A32NX_BRAKES_HOT' })
    lVar: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Date the Fault Occurred' })
    eventDate: Date;

    @IsOptional()
    @ApiProperty({ description: 'Relevant ATA classification' })
    ata: string;

    @IsOptional()
    @ApiProperty({ description: 'Source of Fault', example: 'BMC 2' })
    source: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Flight Phase where Fault Occurred', example: 5 })
    flightPhase: number;

    @IsOptional()
    @ApiProperty({ description: 'Type of Fault', example: 'INTERMITTENT' })
    type: string;

    @IsOptional()
    @ApiProperty({ description: 'C2Afect', example: false })
    c2Afect: boolean;

    @IsOptional()
    @ApiProperty({ description: 'Class Number', example: 1 })
    classNumber: number;

    @IsOptional()
    @ApiProperty({ description: 'Identifiers', example: '[ID 1, ID 2]' })
    identifiers: string;
}
