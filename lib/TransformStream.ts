import { Transform } from 'stream';
import { IArrayOfObjects } from './models/Interfaces';

export class TransformStream extends Transform {
  firstChunk: boolean;
  titles: string[];
  index: number;
  data: string;

  constructor() {
    super();
    this.firstChunk = true;
    this.titles = [];
    this.data = '';
  }

  _transform(data: string, encoding: string, callback: Function) {
    this.data += data;

    const arrayOfObjects: IArrayOfObjects[] = this.data.match(/{[^}]*}/g).map((string) => JSON.parse(string));

    if (this.firstChunk) {
      this.titles = Object.keys(arrayOfObjects[0]);
      const titles = this.titles.join(',');
      this.push(`${titles}\n`);
      this.firstChunk = false;
    }

    arrayOfObjects.map((obj) => {
      const arrayValue: string[] = [];
      this.titles.map((title) => {
        arrayValue.push(obj[title]);
      });
      const values = arrayValue.join(',');
      this.push(`${values}\n`);
    });

    this.data =  this.data.substr(this.data.lastIndexOf('{'));
    callback();
  }
}
