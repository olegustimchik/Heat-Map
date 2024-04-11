import Jimp from 'jimp';

import { ColorGradient } from '../heatMapColor/colorGradient';

import { HelperService } from './helper';

export class HeapMapService {
  constructor(
    private helper: HelperService,
    private colorGradient: ColorGradient,
  ) { }

  generateHeapMap = async (pathToGrid: string): Promise<string> => {
    const image = await Jimp.read('./public/images/rotated.jpeg');
    const data = await this.helper.readFile(pathToGrid);
    let inverse = data.reverse()
    const bufferedImage = await this.updateColorsOfEmptyMap(image, inverse);
    await this.helper.writeFile("../frontend/public/images/newImage.jpeg", bufferedImage);
    return "./public/images/newImage.jpeg";
  };

  updateColorsOfEmptyMap = async (image: Jimp, temperatures: Buffer): Promise<Buffer> => {
    const BINARY_X = 36000;
    const BINARY_Y = 17999;
    const scaleX = Math.floor(BINARY_Y / image.bitmap.width);
    const scaleY = Math.floor(BINARY_X / image.bitmap.height);
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y) => {
      const index = BINARY_X * x * scaleX + y * scaleY;
      if (temperatures[index].valueOf() !== 255) {
        const newColor = this.colorGradient.generateColor(temperatures[index].valueOf());
        image.setPixelColor(Jimp.rgbaToInt(newColor.r, newColor.g, newColor.b, newColor.a), x, y);
      }
    });
    image.rotate(270); 
    return await image.getBufferAsync(Jimp.MIME_JPEG);
  };
}
