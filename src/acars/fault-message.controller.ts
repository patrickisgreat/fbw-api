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
import { AcarsService } from './acars.service';
import { CreateFaultMessageDto } from './dto/create-fault-message.dto';
import { UpdateFaultMessageDto } from './dto/update-fault-message.dto';
import { FaultMessage } from './entities/fault-message.entity';

@ApiTags('ACMS')
@Controller('fault-message')
@UseInterceptors(CacheInterceptor)
export class FaultMessageController {
    constructor(private readonly acmsService: AcarsService) { }

    @Post()
    @ApiBody({ description: 'The New Fault Message', type: CreateFaultMessageDto })
    @ApiCreatedResponse({ description: 'A new Fault Message was Created', type: FaultMessage })
    @ApiBadRequestResponse({ description: 'This fault Message already exists' })
    create(@Body() newFaultMessage: CreateFaultMessageDto) {
        return this.acmsService.createFaultMessage(newFaultMessage);
    }

    @Get()
    @CacheTTL(15)
    @ApiOkResponse({ description: 'All Existing Fault Messages', type: FaultMessage })
    getAll() {
        return this.acmsService.getAllFaultMessages();
    }

    @Get(':id')
    @CacheTTL(15)
    @ApiParam({ name: 'id', description: 'The FAULT message ID', example: '6571f19e-21f7-4080-b239-c9d649347101' })
    @ApiOkResponse({ description: 'The fault message with the given ID was found', type: FaultMessage })
    @ApiNotFoundResponse({ description: 'The fault message with the given ID could not be found' })
    getOne(@Param('id') id: string) {
        return this.acmsService.getOneFaultMessage(+id);
    }

    @ApiBody({ description: 'The updated message', type: UpdateFaultMessageDto })
    @ApiOkResponse({ description: 'The message got updated', type: FaultMessage })
    @ApiNotFoundResponse({ description: 'The message with the given ID could not be found' })
    @Put(':id')
    update(@Param('id') id: string, @Body() updatedFaultMessage: UpdateFaultMessageDto) {
        return this.acmsService.updateFaultMessage(id, updatedFaultMessage);
    }

    @ApiOkResponse({ description: 'The FAULT message got deleted FOREVER' })
    @ApiNotFoundResponse({ description: 'The FAULT message with the given ID could not be found' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.acmsService.removeFaultMessage(+id);
    }
}
