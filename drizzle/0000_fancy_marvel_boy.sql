CREATE TYPE "public"."transaction_type" AS ENUM('DEPOSIT', 'WITHDRAW', 'TRANSFER_SENT', 'TRANSFER_RECEIVED');--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"related_user_id" uuid,
	"type" "transaction_type" NOT NULL,
	"amount_in_cents" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_client" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"balance" integer DEFAULT 0 NOT NULL,
	"user_type" text NOT NULL,
	"cpf" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_client_email_unique" UNIQUE("email"),
	CONSTRAINT "user_client_cpf_unique" UNIQUE("cpf")
);
