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

      res.download(archive, (err) => {
        if (err) { 
          res.status(500).send({ message: "Can't read file"}); 
        }
      });
    } catch (err) {
      res.status(400).send({ message: 'Something went wrong' });
      console.log(err);
      // here must be logger
    }
  };
}
