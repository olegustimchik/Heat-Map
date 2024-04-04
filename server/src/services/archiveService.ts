import JSZip from 'jszip';
import * as fs from "fs";
import { HelperService } from './helper';

export class ArchiveService {
  constructor(private helper: HelperService) { }

  createArchive = async (path: string): Promise<string> => {
    if (fs.existsSync("./public/grid.zip")) { 
      return "./public/grid.zip";
    }
    const jszip = new JSZip();
    const data = await this.helper.readFile(path);
    jszip.file('sst.grid', data);
    const archive = await jszip.generateAsync({ type: 'nodebuffer' });
    await this.helper.writeFile("./public/grid.zip", archive);
    return "./public/grid.zip";
  };
}
