import * as fs from 'fs';

export class HeapMapService {
  constructor() {}

  generateHeapMap = async () => {
    await fs.readFile('./public/sst.grid', (err, data) => {
      console.log(data);
      if (err) {
        console.log(err);
      }
    });
  };
}
