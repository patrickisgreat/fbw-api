import { Module } from '@nestjs/common';
import { AcmsService } from './acms.service';
import { AcmsMessageController } from './acms-message..controller';

@Module({
    controllers: [AcmsMessageController],
    providers: [AcmsService],
})
export class AcmsModule { }
