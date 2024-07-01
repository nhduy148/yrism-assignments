import fs from 'fs';
import path from 'path';

export function getEntityFilePath(entity: string) {
  return path.join(process.cwd(), 'src', 'server', 'data', 'seed', `${entity}.json`);
}

export function readEntityFile(entity: string) {
  const path = getEntityFilePath(entity);
  const data = fs.readFileSync(path, { encoding: 'utf-8' });
  return JSON.parse(data);
}
