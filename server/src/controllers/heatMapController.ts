import { Request, Response } from 'express';
import { readFile } from 'node:fs/promises';
import { Controller } from './controller';
import { HeatMapService } from '../services/heatMapService';

export class HeatMapController extends Controller {
  constructor(private heatMapService: HeatMapService) {
    super('/heatMap');
    this.router.get('/', this.get);
    this.router.get('/image', this.getImage);
  }

  get = async (reg: Request, res: Response) => {
    try {
      const image = await this.heatMapService.generateHeatMap('./public/sst.grid');

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
