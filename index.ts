import { createReadStream, createWriteStream } from 'fs';
import * as path from 'path';
import { TransformStream } from './lib/TransformStream';

if (process.argv.length > 4) {
  throw Error('Only this way node index.js NAME_FILE_INPUT.JSON NAME_FILE_OUTPUT.CSV');
}

const NAME_DIR_INPUT = 'input';
const NAME_DIR_OUTPUT = 'output';

const fileToRead1 = path.join(__dirname, NAME_DIR_INPUT, process.argv[2]);
const fileToWrite = path.join(__dirname, NAME_DIR_OUTPUT, process.argv[3]);

const fileStream = createReadStream(fileToRead1);
const transform = new TransformStream();
const write = createWriteStream(fileToWrite);

fileStream.pipe(transform).pipe(write);
