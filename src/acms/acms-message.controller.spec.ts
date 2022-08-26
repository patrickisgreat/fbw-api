import { Test, TestingModule } from '@nestjs/testing';
import { AcmsController } from './acms-message..controller';
import { AcmsService } from './acms.service';

describe('AcmsController', () => {
  let controller: AcmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcmsController],
      providers: [AcmsService],
    }).compile();

    controller = module.get<AcmsController>(AcmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
