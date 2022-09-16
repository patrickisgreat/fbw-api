import { Test, TestingModule } from '@nestjs/testing';
import { AcarsService } from './acars.service';

describe('AcarsService', () => {
    let service: AcarsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({ providers: [AcarsService] }).compile();

        service = module.get<AcarsService>(AcarsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
