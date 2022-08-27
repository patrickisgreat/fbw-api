import { Test, TestingModule } from '@nestjs/testing';
import { AcmsService } from './acms.service';

describe('AcmsService', () => {
    let service: AcmsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AcmsService],
        }).compile();

        service = module.get<AcmsService>(AcmsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
