import { Test, TestingModule } from '@nestjs/testing';
import { HotDogsService } from './hot-dogs.service';

describe('HotDogsService', () => {
  let service: HotDogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotDogsService],
    }).compile();

    service = module.get<HotDogsService>(HotDogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
