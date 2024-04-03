import { Request, Response } from 'express';
import { ArchiveService } from 'src/services/archiveService';

import { Controller } from '../controllers/controller';

export class ArchiveController extends Controller {
  constructor(private archiveService: ArchiveService) {
    super('/archive');
    this.router.get('/', this.get);
  }

  get = async (reg: Request, res: Response) => {
    try {
      const archive = await this.archiveService.createArchive('./public/sst.grid');

      res.send(archive);
    } catch (err) {
      res.sendStatus(400).send({ message: 'Something went wrong' });
      // here must be logger
    }
  };
}
