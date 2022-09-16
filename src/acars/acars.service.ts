import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateAcmsMessageDto } from './dto/create-acms-message.dto';
import { UpdateAcmsMessageDto } from './dto/update-acms-message.dto';
import { AcmsMessage, AcmsMessageDirection, AcmsMessageStatus } from './entities/acms-message.entity';
import { FaultMessage } from './entities/fault-message.entity';
import { CreateFaultMessageDto } from './dto/create-fault-message.dto';
import { UpdateFaultMessageDto } from './dto/update-fault-message.dto';

@Injectable()
export class AcarsService {
    private readonly logger = new Logger(AcarsService.name);

    constructor(
        @InjectRepository(AcmsMessage)
        private readonly acmsMessageRepository: Repository<AcmsMessage>,
        @InjectRepository(FaultMessage)
        private readonly faultMessageRepository: Repository<FaultMessage>,
    ) { }

    // ACMS MESSAGES
    // TODO: this probably should create an ACARS entity, with a relation of ACMS / ATSU etc.
    async createAcmsMessage(acmsMessage: CreateAcmsMessageDto) {
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

    async getOneAcmsMessage(flightNumber: string,
        tailNumber: string,
        status: string = 'New',
        direction: string = 'Uplink'): Promise<AcmsMessage> {
        const singleMessage = await this.acmsMessageRepository.findOne({
            where: {
                flightNumber,
                tailNumber,
                ComStatus: status,
                Direction: direction,
            },
            relations: ['faultMessages'],
        });

        if (!singleMessage) {
            const message = `ACMS Message with Flight number ${flightNumber} Doesn't exist`;
            this.logger.error(message);
            throw new HttpException(message, 404);
        }

        return singleMessage;
    }

    public atsuStatusToCmsStatus(ComStatus: string): AcmsMessageStatus {
        switch (ComStatus) {
        case 'New': return AcmsMessageStatus.New;
        case 'Open': return AcmsMessageStatus.Open;
        case 'Sending': return AcmsMessageStatus.Sending;
        case 'Sent': return AcmsMessageStatus.Sent;
        case 'Failed': return AcmsMessageStatus.Failed;
        case 'Received': return AcmsMessageStatus.Received;
        default: return AcmsMessageStatus.New;
        }
    }

    public atsuDirectionToCmsDir(Direction: string): AcmsMessageDirection {
        switch (Direction) {
        case 'Downlink': return AcmsMessageDirection.Downlink;
        case 'Uplink': return AcmsMessageDirection.Uplink;
        default: return AcmsMessageDirection.Uplink;
        }
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

        return this.acmsMessageRepository.save(updatedMessage);
    }

    async removeAcmsMessage(id: string): Promise<DeleteResult> {
        return this.acmsMessageRepository.delete(id);
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

    async updateFaultMessage(id: string, updatedFaultMessage: UpdateFaultMessageDto) {
        return this.faultMessageRepository.update(id, updatedFaultMessage);
    }

    async removeFaultMessage(id: number): Promise<void> {
        await this.faultMessageRepository.delete(id);
    }
}
