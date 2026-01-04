console.log(global);

import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { add, subtract, multiply, divide } from './math.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(add(3, 2));
console.log(subtract(3, 2));
console.log(multiply(3, 2));
console.log(divide(3, 2));
/*
console.log(os.type());
console.log(os.platform());
console.log(os.arch());
console.log(os.homedir());
console.log(os.version());

console.log(__dirname);
console.log(__filename);

console.log(path.basename(__filename));
console.log(path.dirname(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename)); */