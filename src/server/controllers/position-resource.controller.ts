import express, { Request, Response } from 'express';
import { PositionResourceResponse } from 'shared/types';
import { POSITION_RESOURCE_TABLE, getDb } from '../database';

export class PositionResourceController {
  static router = express.Router();

  static async getpositionResource(req: Request, res: Response<PositionResourceResponse>) {
    const db = await getDb();
    const employees = db.chain.get(POSITION_RESOURCE_TABLE).value();
    res.status(200).json({ success: true, data: employees });
  }
}

PositionResourceController.router.get('/', PositionResourceController.getpositionResource);
