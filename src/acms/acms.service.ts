import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateAcmMessageDto } from './dto/create-acms-message.dto';
import { UpdateAcmsMessageDto } from './dto/update-acms-message.dto';
import { AcmsMessage } from './entities/acms-message.entity';
import { FaultMessage } from './entities/fault-message.entity';
import { CreateFaultMessageDto } from './dto/create-fault-message.dto';
import { UpdateFaultMessageDto } from './dto/update-fault-message.dto';

@Injectable()
export class AcmsService {
    private readonly logger = new Logger(AcmsService.name);

    constructor(
        @InjectRepository(AcmsMessage)
        private readonly acmsMessageRepository: Repository<AcmsMessage>,
        @InjectRepository(FaultMessage)
        private readonly faultMessageRepository: Repository<FaultMessage>,
    ) { }

    // ACMS MESSAGES
    async createAcmsMessage(acmsMessage: CreateAcmMessageDto) {
        // we'll start with one to not get stuck
        // TODO: make this more flexible -- multiple entities at once
        if (acmsMessage.faultMessages.length > 0) {
            // new up a fault message for each message in the array
            const newFaultMessages = acmsMessage.faultMessages.map((message) => this.faultMessageRepository.create(message));
            // new up containing ACMS message
            const newAcmsMessage = this.acmsMessageRepository.create(acmsMessage);
            // set acms faultMessages array with new instances
            newAcmsMessage.faultMessages = newFaultMessages;
            // save
            return this.acmsMessageRepository.save(newAcmsMessage);
        }
        return this.acmsMessageRepository.save(acmsMessage);
    }

    async getAllAcmsMessages(): Promise<AcmsMessage[]> {
        return this.acmsMessageRepository.find();
    }

    async getOneAcmsMessage(id: number): Promise<AcmsMessage> {
        return this.acmsMessageRepository.findOne(id);
    }

    async updateAcmsMessage(flightNumber: string, updatedAcmsMessage: UpdateAcmsMessageDto) {
        const fetchedMessage = await this.acmsMessageRepository.findOne({ where: { flightNumber }, relations: ['faultMessages'] });

        if (!fetchedMessage) {
            const message = `ACMS Messages with Flight number ${flightNumber} Doesn't exist`;
            this.logger.error(message);
            throw new HttpException(message, 404);
        }

        updatedAcmsMessage.id = fetchedMessage.id;

        const updatedMessage = await this.acmsMessageRepository.preload(updatedAcmsMessage);

        if (updatedMessage.faultMessages) {
            // TODO: this probably doesn't need to be a create
            // need to check for the foreign key or other keys
            const faultMsgsToUpdate = updatedAcmsMessage.faultMessages.map(
                (message) => this.faultMessageRepository.create(message),
            );

            updatedMessage.faultMessages = faultMsgsToUpdate;

            return this.acmsMessageRepository.save(updatedMessage);
        }

        return this.acmsMessageRepository.save(updatedMessage);
    }

    async removeAcmsMessage(id: number): Promise<void> {
        await this.acmsMessageRepository.delete(id);
    }

    // FAULT MESSAGES
    async createFaultMessage(faultMessage: CreateFaultMessageDto) {
        return this.faultMessageRepository.save(faultMessage);
    }

    async getAllFaultMessages(): Promise<FaultMessage[]> {
        return this.faultMessageRepository.find();
    }

    async getOneFaultMessage(id: number): Promise<FaultMessage> {
        return this.faultMessageRepository.findOne(id);
    }

    async updateFaultMessage(id: number, updatedFaultMessage: UpdateFaultMessageDto) {
        return this.faultMessageRepository.update(id, updatedFaultMessage);
    }

    async removeFaultMessage(id: number): Promise<void> {
        await this.faultMessageRepository.delete(id);
    }
}
