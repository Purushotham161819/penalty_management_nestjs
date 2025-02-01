import { Test, TestingModule } from '@nestjs/testing';
import { ViolatorService } from './violator.service';

describe('ViolatorService', () => {
  let service: ViolatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViolatorService],
    }).compile();

    service = module.get<ViolatorService>(ViolatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
