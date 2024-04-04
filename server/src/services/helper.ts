import * as fs from 'node:fs';

export class HelperService {
  readFile = (path: string): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, async (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  };

  writeFile = (path: string, data: string | Buffer): Promise<void> => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  };

}
