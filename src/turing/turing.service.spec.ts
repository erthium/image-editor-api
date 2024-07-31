import { Test, TestingModule } from '@nestjs/testing';
import { TuringService } from './turing.service';

describe('TuringService', () => {
  let service: TuringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TuringService],
    }).compile();

    service = module.get<TuringService>(TuringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
