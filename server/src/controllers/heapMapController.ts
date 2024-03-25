import { Controller } from 'src/controllers/controller';
import { Request, Response } from 'express';
import { HeapMapService } from 'src/services/heapMapService';

export class HeapMapController extends Controller {
  constructor(private heapMapService: HeapMapService) {
    super('/heapMap');
    this.router.get('/', this.get);
  }

  get = async (reg: Request, res: Response) => {
    await this.heapMapService.generateHeapMap();
  };
}
