import { Injectable } from '@nestjs/common';
import { UserClientGateway } from 'src/accounts/core/domain/ports/UserClientGateway';
import { DrizzleService } from '../drizzle/drizzle.service';
import { UserClient } from 'src/accounts/core/domain/entity/UserClient';
import { UserClientMapper } from '../drizzle/mappers/UserClientMapper';
import { userClient } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserClientRepository implements UserClientGateway {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(entity: UserClient): Promise<UserClient> {
    const data = UserClientMapper.toDatabase(entity);
    const result = await this.drizzle.db.insert(userClient).values(data);
    return UserClientMapper.toDomain(result);
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
}
