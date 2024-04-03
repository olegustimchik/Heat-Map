import JSZip from 'jszip';

import { HelperService } from './helper';

export class ArchiveService {
  constructor(private helper: HelperService) {}

  createArchive = async (path: string): Promise<Buffer> => {
    const jszip = new JSZip();
    const data = await this.helper.readFile(path);

    jszip.file('grid', data);
    const archive = await jszip.generateAsync({ type: 'nodebuffer' });

    return archive;
  };
}
