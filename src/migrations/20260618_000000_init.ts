import { sql } from '@payloadcms/db-postgres'
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "_locales" AS ENUM ('fr', 'en', 'es');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE TABLE IF NOT EXISTS "users" (
      "id" serial PRIMARY KEY NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "email" varchar NOT NULL,
      "reset_password_token" varchar,
      "reset_password_expiration" timestamp(3) with time zone,
      "salt" varchar,
      "hash" varchar,
      "login_attempts" numeric DEFAULT 0,
      "lock_until" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "users_sessions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "created_at" timestamp(3) with time zone NOT NULL,
      "expires_at" timestamp(3) with time zone NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages" (
      "id" serial PRIMARY KEY NOT NULL,
      "slug" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "pages_locales" (
      "title" varchar NOT NULL,
      "content" jsonb,
      "seo_title" varchar,
      "seo_description" varchar,
      "seo_keywords" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "posts" (
      "id" serial PRIMARY KEY NOT NULL,
      "slug" varchar NOT NULL,
      "published_at" timestamp(3) with time zone,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "posts_locales" (
      "title" varchar NOT NULL,
      "excerpt" varchar,
      "content" jsonb,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "location_pages" (
      "id" serial PRIMARY KEY NOT NULL,
      "city" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "location_pages_locales" (
      "content" jsonb,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "settings" (
      "id" serial PRIMARY KEY NOT NULL,
      "site_title" varchar,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "settings_locales" (
      "site_description" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "settings_nav_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "href" varchar
    );

    CREATE TABLE IF NOT EXISTS "settings_nav_links_locales" (
      "label" varchar,
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "payload_migrations" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "batch" numeric,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
      "id" serial PRIMARY KEY NOT NULL,
      "global_slug" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "users_id" integer,
      "pages_id" integer,
      "posts_id" integer,
      "location_pages_id" integer
    );

    CREATE TABLE IF NOT EXISTS "payload_preferences" (
      "id" serial PRIMARY KEY NOT NULL,
      "key" varchar,
      "value" jsonb,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "users_id" integer
    );

    DO $$ BEGIN
      ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "posts"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "location_pages_locales" ADD CONSTRAINT "location_pages_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "location_pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "settings_locales" ADD CONSTRAINT "settings_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "settings_nav_links" ADD CONSTRAINT "settings_nav_links_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "settings_nav_links_locales" ADD CONSTRAINT "settings_nav_links_locales_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "settings_nav_links"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk"
        FOREIGN KEY ("parent_id") REFERENCES "payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk"
        FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
    CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" ("slug");
    CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" ("slug");
    CREATE UNIQUE INDEX IF NOT EXISTS "location_pages_slug_idx" ON "location_pages" ("slug");
    CREATE UNIQUE INDEX IF NOT EXISTS "pages_locales_locale_parent_unique" ON "pages_locales" ("_locale", "_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "posts_locales_locale_parent_unique" ON "posts_locales" ("_locale", "_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "location_pages_locales_locale_parent_unique" ON "location_pages_locales" ("_locale", "_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "settings_locales_locale_parent_unique" ON "settings_locales" ("_locale", "_parent_id");
    CREATE UNIQUE INDEX IF NOT EXISTS "settings_nav_links_locales_locale_parent_unique" ON "settings_nav_links_locales" ("_locale", "_parent_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" ("order");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" ("parent_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" ("path");
    CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
    CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
    CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
    CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "payload_preferences_rels";
    DROP TABLE IF EXISTS "payload_preferences";
    DROP TABLE IF EXISTS "payload_locked_documents_rels";
    DROP TABLE IF EXISTS "payload_locked_documents";
    DROP TABLE IF EXISTS "payload_migrations";
    DROP TABLE IF EXISTS "settings_nav_links_locales";
    DROP TABLE IF EXISTS "settings_nav_links";
    DROP TABLE IF EXISTS "settings_locales";
    DROP TABLE IF EXISTS "settings";
    DROP TABLE IF EXISTS "location_pages_locales";
    DROP TABLE IF EXISTS "location_pages";
    DROP TABLE IF EXISTS "posts_locales";
    DROP TABLE IF EXISTS "posts";
    DROP TABLE IF EXISTS "pages_locales";
    DROP TABLE IF EXISTS "pages";
    DROP TABLE IF EXISTS "users_sessions";
    DROP TABLE IF EXISTS "users";
    DROP TYPE IF EXISTS "_locales";
  `)
}
