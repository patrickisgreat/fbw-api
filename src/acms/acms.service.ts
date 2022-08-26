import { Injectable } from '@nestjs/common';
import { AcmsMessageController } from './acms-message..controller';
import { CreateAcmMessageDto } from './dto/create-acms-message.dto';
import { UpdateAcmsMessageDto } from './dto/update-acms-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcmsMessage } from './entities/acms-message.entity';

@Injectable()
export class AcmsService {
    constructor(
        @InjectRepository(AcmsMessageController)
        private readonly acmsMessageRepository: Repository<AcmsMessage>,
    ) { }

    createAcmsMessage(CreateAcmMessageDto: CreateAcmMessageDto) {
        return 'This action adds a new acm';
    }

    getAllAcmsMessages() {
        return `This action returns all acms`;
    }

    getOneAcmsMessage(id: number) {
        return `This action returns a #${id} acm`;
    }

    updateAcmsMessage(id: number, UpdateAcmsMessageDto: UpdateAcmsMessageDto) {
        return `This action updates a #${id} acm`;
    }

    removeAcmsMessage(id: number) {
        return `This action removes a #${id} acm`;
    }
}
