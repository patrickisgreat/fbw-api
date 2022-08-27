import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateFaultMessageDto } from './update-fault-message.dto';

export class CreateFaultMessageDto extends UpdateFaultMessageDto {
    @IsNotEmpty()
    @ApiProperty({ description: 'The Text of the Fault Message', example: 'PRESS REG-V 4001HA2 OR SOL 10HA2 OR SENSE LINE' })
    text: string;
}
