import Jimp from 'jimp';

import { ColorGradient } from '../heatMapColor/colorGradient';

import { HelperService } from './helper';

export class HeapMapService {
  constructor(
    private helper: HelperService,
    private colorGradient: ColorGradient,
  ) {}

  generateHeapMap = async (pathToGrid: string): Promise<Buffer> => {
    const image = await Jimp.read('./public/images/empty-map.jpg');
    const data = await this.helper.readFile(pathToGrid);
    const bufferedImage = await this.updateColorsOfEmptyMap(image, data);

    return bufferedImage;
  };

  updateColorsOfEmptyMap = async (image: Jimp, temperatures: Buffer): Promise<Buffer> => {
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y) => {
      if (temperatures[image.getWidth() * x + y].valueOf() !== 255) {
        const newColor = this.colorGradient.generateColor(temperatures[image.getWidth() * x + y].valueOf());

        image.setPixelColor(Jimp.rgbaToInt(newColor.r, newColor.g, newColor.b, newColor.a), x, y);
      }
    });

    return await image.getBufferAsync(Jimp.MIME_JPEG);
  };
}
