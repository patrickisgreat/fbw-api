import { Test, TestingModule } from '@nestjs/testing';
import { FaultMessageController } from './fault-message.controller';
import { AcmsService } from './acms.service';

describe('FaultMessageController', () => {
    let controller: FaultMessageController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FaultMessageController],
            providers: [AcmsService],
        }).compile();

        controller = module.get<FaultMessageController>(FaultMessageController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
