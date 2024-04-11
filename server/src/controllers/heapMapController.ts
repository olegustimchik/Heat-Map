import { Request, Response } from 'express';
import { readFile } from 'node:fs/promises';
import { Controller } from '../controllers/controller';
import { HeapMapService } from '../services/heapMapService';

export class HeapMapController extends Controller {
  constructor(private heapMapService: HeapMapService) {
    super('/heatMap');
    this.router.get('/', this.get);
    this.router.get('/image', this.getImage);
  }

  get = async (reg: Request, res: Response) => {
    try {
      const image = await this.heapMapService.generateHeapMap('./public/sst.grid');

      res.send({ path: image });
    } catch (err) {
      console.log(err); 
      res.status(400).send({ message: 'Something went wrong' });
      // here must be logger
    }
  };

  getImage = async (reg: Request, res: Response) => {
    try {
      const image = readFile("./public/images/newImage.")

      res.send({ path: image });
    } catch (err) {
      res.status(400).send({ message: 'Something went wrong' });
      // here must be logger
    }
  }
}
