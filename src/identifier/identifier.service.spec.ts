import { Test, TestingModule } from '@nestjs/testing';
import { IdentifierService } from './identifier.service';

describe('IdentifierService', () => {
  let service: IdentifierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdentifierService],
    }).compile();

    service = module.get<IdentifierService>(IdentifierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
