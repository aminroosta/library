import fs from 'fs';
import path from 'path';

const read = (relativePath : string) => fs.readFileSync(
  path.join(__dirname, relativePath),
  'utf8',
);

export const getByQuery = read('./getByQuery.index.xml');
export const getById = read('./getById.index.xml');
export const getByIframe = read('./getByIframe.index.html');
export const getReviewByUrl = read('./getReviewByUrl.index.html');
