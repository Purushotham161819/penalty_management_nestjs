import { Test, TestingModule } from '@nestjs/testing';
import { ViolatorController } from './violator.controller';

describe('ViolatorController', () => {
  let controller: ViolatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViolatorController],
    }).compile();

    controller = module.get<ViolatorController>(ViolatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
