import { Test, TestingModule } from '@nestjs/testing';
import { FaultMessageController } from './fault-message.controller';
import { AcarsService } from './acars.service';

describe('FaultMessageController', () => {
    let controller: FaultMessageController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FaultMessageController],
            providers: [AcarsService],
        }).compile();

        controller = module.get<FaultMessageController>(FaultMessageController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
