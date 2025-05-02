import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeClassicController } from './coffee-classic.controller';

describe('CoffeeClassicController', () => {
  let controller: CoffeeClassicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoffeeClassicController],
    }).compile();

    controller = module.get<CoffeeClassicController>(CoffeeClassicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
