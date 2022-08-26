import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AcmsService } from './acms.service';
import { CreateAcmMessageDto } from './dto/create-acms-message.dto';
import { UpdateAcmsMessageDto } from './dto/update-acms-message.dto';

@Controller('acms-message')
export class AcmsMessageController {
  constructor(private readonly acmsService: AcmsService) {}
  
  @Post()
  create(@Body() createAcmDto: CreateAcmMessageDto) {
    return this.acmsService.createAcmsMessage(createAcmDto);
  }

  @Get()
  getAll() {
    return this.acmsService.getAllAcmsMessages();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.acmsService.getOneAcmsMessage(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateAcmsMessageDto: UpdateAcmsMessageDto) {
    return this.acmsService.updateAcmsMessage(+id, UpdateAcmsMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acmsService.removeAcmsMessage(+id);
  }
}
