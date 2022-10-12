import { Test, TestingModule } from '@nestjs/testing';
import { AcmsMessageController } from './acms-message.controller';
import { AcarsService } from './acars.service';

// controller
describe('AcmsMessageController', () => {
    let controller: AcmsMessageController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AcmsMessageController],
            providers: [AcarsService],
        }).compile();

        controller = module.get<AcmsMessageController>(AcmsMessageController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
