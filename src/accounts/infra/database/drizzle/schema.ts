import { integer } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable as table, text } from "drizzle-orm/pg-core";

export const userClient = table('user_client',{
    id: uuid('id').defaultRandom().primaryKey(),
    fullName: text('full_name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    balance:integer('balance').notNull().default(0),
    userType: text('user_type').notNull(),
    cpf: text('cpf').notNull().unique(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
})