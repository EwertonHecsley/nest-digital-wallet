import { Injectable } from '@nestjs/common';
import {
  FindAllParams,
  PaginatedResponse,
  UserClientGateway,
} from 'src/accounts/core/domain/ports/UserClientGateway';
import { DrizzleService } from '../drizzle/drizzle.service';
import { UserClient } from 'src/accounts/core/domain/entity/UserClient';
import { UserClientMapper } from '../drizzle/mappers/UserClientMapper';
import { userClient } from '../drizzle/schema';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class UserClientRepository implements UserClientGateway {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(entity: UserClient): Promise<UserClient> {
    const data = UserClientMapper.toDatabase(entity);
    const result = await this.drizzle.db
      .insert(userClient)
      .values(data)
      .returning();
    return UserClientMapper.toDomain(result[0]);
  }

  async findByEmail(email: string): Promise<UserClient | null> {
    const user = await this.drizzle.db
      .select()
      .from(userClient)
      .where(eq(userClient.email, email));
    return user.length > 0 ? UserClientMapper.toDomain(user[0]) : null;
  }

  async findByCpf(cpf: string): Promise<UserClient | null> {
    const user = await this.drizzle.db
      .select()
      .from(userClient)
      .where(eq(userClient.cpf, cpf));
    return user.length > 0 ? UserClientMapper.toDomain(user[0]) : null;
  }

  async listAll(params: FindAllParams): Promise<PaginatedResponse<UserClient>> {
    const { page, limit } = params;
    const offset = (page - 1) * limit;

    const data = await this.drizzle.db
      .select()
      .from(userClient)
      .limit(limit)
      .offset(offset);

    const [{ count }] = await this.drizzle.db
      .select({ count: sql<number>`count(*)` })
      .from(userClient);

    return {
      data: data.map(UserClientMapper.toDomain),
      total: Number(count),
      page,
      limit,
    };
  }

  async findById(id: string): Promise<UserClient | null> {
    const user = await this.drizzle.db
      .select()
      .from(userClient)
      .where(eq(userClient.id, id));

    return user.length > 0 ? UserClientMapper.toDomain(user[0]) : null;
  }

  async delete(id: string): Promise<void> {
    await this.drizzle.db.delete(userClient).where(eq(userClient.id, id));
  }
}
