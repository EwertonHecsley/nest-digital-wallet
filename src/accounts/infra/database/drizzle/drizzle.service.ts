import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { db, pool } from './drizzle.config';

@Injectable()
export class DrizzleService implements OnModuleDestroy {
  public readonly db = db;

  async onModuleDestroy() {
    await pool.end();
  }
}
