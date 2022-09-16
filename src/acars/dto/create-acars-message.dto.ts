import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateAcmsMessageDto } from './update-acms-message.dto';

export class CreateAcmMessageDto extends UpdateAcmsMessageDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'The flight number', example: 'OS355' })
    flightNumber: string;
}
