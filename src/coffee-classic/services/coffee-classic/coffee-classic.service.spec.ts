import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeClassicService } from './coffee-classic.service';

describe('CoffeeClassicService', () => {
  let service: CoffeeClassicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeClassicService],
    }).compile();

    service = module.get<CoffeeClassicService>(CoffeeClassicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
