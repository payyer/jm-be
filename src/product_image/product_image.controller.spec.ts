import { Test, TestingModule } from '@nestjs/testing';
import { ProductImageController } from './product_image.controller';

describe('ProductImageController', () => {
  let controller: ProductImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductImageController],
    }).compile();

    controller = module.get<ProductImageController>(ProductImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
