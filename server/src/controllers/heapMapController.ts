import { Request, Response } from 'express';

import { Controller } from '../controllers/controller';
import { HeapMapService } from '../services/heapMapService';

export class HeapMapController extends Controller {
  constructor(private heapMapService: HeapMapService) {
    super('/heatMap');
    this.router.get('/', this.get);
  }

  get = async (reg: Request, res: Response) => {
    try {
      const image = await this.heapMapService.generateHeapMap('./public/sst.grid');

      res.setHeader('content-type', '');
      res.send(image.toJSON());
    } catch (err) {
      res.sendStatus(400).send({ message: 'Something went wrong' });
      // here must be logger
    }
  };
}
