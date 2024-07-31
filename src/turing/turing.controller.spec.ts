import { Test, TestingModule } from '@nestjs/testing';
import { TuringController } from './turing.controller';

describe('TuringController', () => {
  let controller: TuringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TuringController],
    }).compile();

    controller = module.get<TuringController>(TuringController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
