import path from 'path';

import { JSONFile, Low } from 'jddb';
import lodash from 'lodash';
import { Employee, PositionResource } from 'shared/types';

import { readEntityFile } from './data/helpers';

const databaseFile = path.join(process.cwd(), '', 'database.json');

export const EMPLOYEE_TABLE = 'employees';
export const POSITION_RESOURCE_TABLE = 'position_resources';

interface DbSchema {
  [EMPLOYEE_TABLE]: Employee[];
  [POSITION_RESOURCE_TABLE]: PositionResource[];
}

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data');
}

const adapter = new JSONFile<DbSchema>(databaseFile);
const db = new LowWithLodash(adapter);

export async function getDb() {
  await db.read();
  return db;
}

export const seedDatabase = async () => {
  const employees = readEntityFile(EMPLOYEE_TABLE);
  const position_resources = readEntityFile(POSITION_RESOURCE_TABLE);

  await db.read();

  db.data = {
    employees,
    position_resources,
  };

  // seed database with test data
  await db.write();
};
