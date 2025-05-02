import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeWithMilkController } from './coffee-with-milk.controller';

describe('CoffeeWithMilkController', () => {
  let controller: CoffeeWithMilkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeWithMilkController],
    }).compile();

    controller = module.get<CoffeeWithMilkController>(CoffeeWithMilkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
