import { Test, TestingModule } from '@nestjs/testing';
import { HotDogsController } from './hot-dogs.controller';

describe('HotDogsController', () => {
  let controller: HotDogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotDogsController],
    }).compile();

    controller = module.get<HotDogsController>(HotDogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
