import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { db } from '../database/drizzle/drizzle.config';

@Injectable()
export class DatabaseHealthIndicator {
  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    let result: HealthIndicatorResult;

    try {
      await db.execute('SELECT 1');
      result = {
        [key]: {
          status: 'up',
        },
      };
    } catch (error) {
      result = {
        [key]: {
          status: 'down',
          message: (error as Error).message,
        },
      };
    }

    return result;
  }
}
