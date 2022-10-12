import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcarsService } from './acars.service';
import { AcmsMessageController } from './acms-message.controller';
import { AcmsMessage } from './entities/acms-message.entity';
import { FaultMessageController } from './fault-message.controller';
import { FaultMessage } from './entities/fault-message.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([AcmsMessage, FaultMessage]),
    ],
    controllers: [AcmsMessageController, FaultMessageController],
    providers: [AcarsService],
})
export class AcarsModule { }