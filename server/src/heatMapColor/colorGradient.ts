import { Color } from "src/interfaces/color"

export class ColorGradient {
  private max: number;

  private min: number;
  constructor() {
    this.max = 93;
    this.min = 30;
  }

  findMaxAndMin = (temperatures: Buffer): void => {

    for (let i = 0; i < temperatures.length; i++) {
      if (temperatures[i].valueOf() !== 255) {
        this.min = (temperatures[i].valueOf() < this.min) ? temperatures[i].valueOf() : this.min;
        this.max = (temperatures[i].valueOf() > this.max) ? temperatures[i].valueOf() : this.max;
      }
    }
    console.log(this.max, this.min);
  };

  normalize = (dataPoint: number): number => {
    return (dataPoint - this.min) / (this.max - this.min);
  };

  getHeatColor = (dataPoint): number[] => {
    const NUM_COLORS = 8;
    const color = [
      [0, 0, 255],
      [24, 205, 224],
      [0, 255, 0],// green
      [124, 252, 0],  
      [255, 255, 0],//yellow 
      [255, 172, 28], 
      [233, 116, 81],// red
      [136, 8, 8],//
    ];
   
    let idx1: number; // Our desired color will be between these two indexes in "color".
    let idx2: number;
    let fractBetween = 0;

    if (dataPoint <= 0) {
      idx1 = 0;
      idx2 = 0;
    } // accounts for an input <=0
    else if (dataPoint >= 1) {
      idx1 = NUM_COLORS - 1;
      idx2 = NUM_COLORS - 1;
    } // accounts for an input >=0
    else {
      dataPoint = dataPoint * (NUM_COLORS - 1); // Will multiply value by 3.
      idx1 = dataPoint; // Our desired color will be after this index.
      idx2 = idx1 + 1; // ... and before this index (inclusive).
      fractBetween = dataPoint - idx1; // Distance between the two indexes (0-1).
    }

    idx1 = Math.floor(idx1);
    idx2 = Math.floor(idx2);
    const red = (color[idx2][0] - color[idx1][0]) * fractBetween + color[idx1][0];
    const green = (color[idx2][1] - color[idx1][1]) * fractBetween + color[idx1][1];
    const blue = (color[idx2][2] - color[idx1][2]) * fractBetween + color[idx1][2];

    return [red, green, blue];
  };

  generateColor = (point: number): Color => {
    const color = this.getHeatColor(this.normalize(point));
    return { r: color[0], g: color[1], b: color[2], a: 255 };
  };

  distance = (goalColor: Color, pixel: Color): number => {
    return Math.sqrt(
      Math.pow(goalColor.r - pixel.r, 2) + Math.pow(goalColor.g - pixel.g, 2) + Math.pow(goalColor.b - pixel.b, 2),
    );
  };
}
