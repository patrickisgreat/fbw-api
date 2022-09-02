import {
    Body, CacheInterceptor, CacheTTL,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { AcmsService } from './acms.service';
import { CreateAcmMessageDto } from './dto/create-acms-message.dto';
import { UpdateAcmsMessageDto } from './dto/update-acms-message.dto';
import { AcmsMessage } from './entities/acms-message.entity';

@ApiTags('ACMS')
@Controller('acms-message')
@UseInterceptors(CacheInterceptor)
export class AcmsMessageController {
    constructor(private readonly acmsService: AcmsService) { }

    @Post()
    @ApiBody({ description: 'The New ACMS Message for a Particular Aircraft and Flight', type: CreateAcmMessageDto })
    @ApiCreatedResponse({ description: 'A new ACMS Message was Created', type: AcmsMessage })
    @ApiBadRequestResponse({ description: 'This message for this flight already exists' })
    create(@Body() createAcmsMessage: CreateAcmMessageDto) {
        return this.acmsService.createAcmsMessage(createAcmsMessage);
    }

    @Get()
    @CacheTTL(15)
    @ApiOkResponse({ description: 'All Existing ACMS Messages for all flights', type: AcmsMessage })
    getAll() {
        return this.acmsService.getAllAcmsMessages();
    }

    @Get(':flightNumber/:tailNumber/:status/:direction')
    @CacheTTL(15)
    @ApiParam({ name: 'id', description: 'The ACMS message ID', example: '6571f19e-21f7-4080-b239-c9d649347101' })
    @ApiOkResponse({ description: 'The message with the given ID was found', type: AcmsMessage })
    @ApiNotFoundResponse({ description: 'The message with the given ID could not be found' })
    getOne(
        @Param('flightNumber') flightNumber: string,
        @Param('tailNumber') tailNumber: string,
        @Param('status') status: string,
        @Param('direction') direction: string,
    ) {
        return this.acmsService.getOneAcmsMessage(flightNumber, tailNumber, status, direction);
    }

    @ApiBody({ description: 'The updated message', type: UpdateAcmsMessageDto })
    @ApiOkResponse({ description: 'The message got updated', type: AcmsMessage })
    @ApiNotFoundResponse({ description: 'The message with the given ID could not be found' })
    @Put(':flightNumber')
    update(@Param('flightNumber') flightNumber: string, @Body() updatedAcmsMessage: UpdateAcmsMessageDto) {
        return this.acmsService.updateAcmsMessage(flightNumber, updatedAcmsMessage);
    }

    @ApiOkResponse({ description: 'The message got deleted FOREVER' })
    @ApiNotFoundResponse({ description: 'The message with the given ID could not be found' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.acmsService.removeAcmsMessage(id);
    }
}
