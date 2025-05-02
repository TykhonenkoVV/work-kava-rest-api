import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeWithMilkService } from './coffee-with-milk.service';

describe('CoffeeWithMilkService', () => {
  let service: CoffeeWithMilkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeeWithMilkService],
    }).compile();

    service = module.get<CoffeeWithMilkService>(CoffeeWithMilkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
