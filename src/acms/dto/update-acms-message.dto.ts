import { PartialType } from '@nestjs/mapped-types';
import { CreateAcmMessageDto } from './create-acms-message.dto';

export class UpdateAcmsMessageDto extends PartialType(CreateAcmMessageDto) {}