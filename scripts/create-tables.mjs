import pg from 'pg'

const { Client } = pg

if (!process.env.DATABASE_URI) {
  console.log('DATABASE_URI not set, skipping table creation.')
  process.exit(0)
}

const client = new Client({ connectionString: process.env.DATABASE_URI })
await client.connect()

console.log('Running database migrations...')

// ── Helpers ────────────────────────────────────────────────────────────────

async function exec(sql) {
  await client.query(sql)
}

// ── Enum ──────────────────────────────────────────────────────────────────

await exec(`
  DO $$ BEGIN
    CREATE TYPE "_locales" AS ENUM ('fr', 'en', 'es');
  EXCEPTION WHEN duplicate_object THEN null; END $$;
`)

// ── Payload internals ─────────────────────────────────────────────────────

await exec(`
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
`)

// ── Users ─────────────────────────────────────────────────────────────────

await exec(`
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
`)

// Add new columns to users (idempotent)
await exec(`
  ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "name" varchar;
`)

// ── Media ─────────────────────────────────────────────────────────────────

await exec(`
  CREATE TABLE IF NOT EXISTS "media" (
    "id" serial PRIMARY KEY NOT NULL,
    "alt" varchar NOT NULL,
    "caption" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "url" varchar,
    "thumbnail_u_r_l" varchar,
    "filename" varchar,
    "mime_type" varchar,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric
  );

  CREATE TABLE IF NOT EXISTS "media_sizes_thumbnail" (
    "_order" integer,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "url" varchar,
    "width" numeric,
    "height" numeric,
    "mime_type" varchar,
    "filesize" numeric,
    "filename" varchar
  );

  CREATE TABLE IF NOT EXISTS "media_sizes_card" (
    "_order" integer,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "url" varchar,
    "width" numeric,
    "height" numeric,
    "mime_type" varchar,
    "filesize" numeric,
    "filename" varchar
  );

  CREATE TABLE IF NOT EXISTS "media_sizes_hero" (
    "_order" integer,
    "_parent_id" integer NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "url" varchar,
    "width" numeric,
    "height" numeric,
    "mime_type" varchar,
    "filesize" numeric,
    "filename" varchar
  );
`)

// ── Authors ───────────────────────────────────────────────────────────────

await exec(`
  CREATE TABLE IF NOT EXISTS "authors" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar NOT NULL,
    "role" varchar,
    "bio" varchar,
    "writing_tone" varchar,
    "avatar_id" integer,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
`)

// Add new columns to authors (idempotent)
await exec(`
  ALTER TABLE "authors" ADD COLUMN IF NOT EXISTS "writing_tone" varchar;
  ALTER TABLE "authors" ADD COLUMN IF NOT EXISTS "linkedin_url" varchar;
  ALTER TABLE "authors" ADD COLUMN IF NOT EXISTS "twitter_url" varchar;
  ALTER TABLE "authors" ADD COLUMN IF NOT EXISTS "website_url" varchar;
  ALTER TABLE "authors" ADD COLUMN IF NOT EXISTS "expertise" varchar;
  ALTER TABLE "authors" ADD COLUMN IF NOT EXISTS "credentials" varchar;
`)

// ── Pages ─────────────────────────────────────────────────────────────────

await exec(`
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
`)

// Add new columns to pages (idempotent)
await exec(`
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "status" varchar DEFAULT 'published';
  ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "seo_og_image_id" integer;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "hero_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "hero_subtitle" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "pages_locales" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
`)

// Pages sections (non-localized array)
await exec(`
  CREATE TABLE IF NOT EXISTS "pages_sections" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "block_type" varchar NOT NULL,
    "headline" varchar,
    "subheadline" text,
    "title" varchar,
    "intro" text,
    "text" text,
    "cta_text" varchar,
    "cta_href" varchar,
    "social_proof" varchar,
    "image_id" integer,
    "image_position" varchar DEFAULT 'right',
    "items" jsonb,
    "content" jsonb
  );
`)

await exec(`
  ALTER TABLE "pages_sections" ADD COLUMN IF NOT EXISTS "block_name" varchar;
`)

// ── Posts ─────────────────────────────────────────────────────────────────

await exec(`
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
`)

// Add new columns to posts (idempotent)
await exec(`
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "status" varchar DEFAULT 'draft';
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "author_id" integer;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "cover_image_id" integer;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "last_edited_at" timestamp(3) with time zone;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "scheduled_at" timestamp(3) with time zone;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "cta_text" varchar;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "cta_href" varchar;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;

  ALTER TABLE "posts_locales" ADD COLUMN IF NOT EXISTS "intro" varchar;
`)

// Posts sections (localized array)
await exec(`
  CREATE TABLE IF NOT EXISTS "posts_sections" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "_locale" "_locales" NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "heading" varchar NOT NULL,
    "anchor" varchar,
    "content" jsonb
  );
`)

// Posts summary (non-localized array)
await exec(`
  CREATE TABLE IF NOT EXISTS "posts_summary" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "text" varchar NOT NULL
  );
`)

// ── Location pages (keep existing) ────────────────────────────────────────

await exec(`
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
`)

// ── Settings ──────────────────────────────────────────────────────────────

await exec(`
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
`)

// Add new columns to settings (idempotent)
await exec(`
  ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "contact_email" varchar;
  ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "seo_default_og_image_id" integer;
  ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "seo_google_site_verification" varchar;
  ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "seo_analytics_id" varchar;
  ALTER TABLE "settings_nav_links" ADD COLUMN IF NOT EXISTS "highlight" boolean DEFAULT false;
  ALTER TABLE "settings_locales" ADD COLUMN IF NOT EXISTS "footer_text" varchar;
`)

// Settings footer links (new array)
await exec(`
  CREATE TABLE IF NOT EXISTS "settings_footer_links" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "href" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "settings_footer_links_locales" (
    "label" varchar NOT NULL,
    "id" serial PRIMARY KEY NOT NULL,
    "_locale" "_locales" NOT NULL,
    "_parent_id" varchar NOT NULL
  );
`)

// ── Payload locked documents rels ─────────────────────────────────────────

await exec(`
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
`)

await exec(`
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "authors_id" integer;
`)

// ── Foreign key constraints (idempotent) ──────────────────────────────────

await exec(`
  DO $$ BEGIN
    ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "users"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "media_sizes_thumbnail" ADD CONSTRAINT "media_sizes_thumbnail_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "media"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "media_sizes_card" ADD CONSTRAINT "media_sizes_card_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "media"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "media_sizes_hero" ADD CONSTRAINT "media_sizes_hero_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "media"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "authors" ADD CONSTRAINT "authors_avatar_id_media_id_fk"
      FOREIGN KEY ("avatar_id") REFERENCES "media"("id") ON DELETE set null;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "pages_sections" ADD CONSTRAINT "pages_sections_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "posts"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "posts_sections" ADD CONSTRAINT "posts_sections_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "posts"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "posts_summary" ADD CONSTRAINT "posts_summary_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "posts"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "location_pages_locales" ADD CONSTRAINT "location_pages_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "location_pages"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "settings_locales" ADD CONSTRAINT "settings_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "settings"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "settings_nav_links" ADD CONSTRAINT "settings_nav_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "settings"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "settings_nav_links_locales" ADD CONSTRAINT "settings_nav_links_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "settings_nav_links"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "settings_footer_links" ADD CONSTRAINT "settings_footer_links_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "settings"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "settings_footer_links_locales" ADD CONSTRAINT "settings_footer_links_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "settings_footer_links"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk"
      FOREIGN KEY ("parent_id") REFERENCES "payload_locked_documents"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;

  DO $$ BEGIN
    ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk"
      FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade;
  EXCEPTION WHEN duplicate_object THEN null; END $$;
`)

// ── Indexes ───────────────────────────────────────────────────────────────

// ── Pillar Pages ──────────────────────────────────────────────────────────

await exec(`
  CREATE TABLE IF NOT EXISTS "pillar_pages" (
    "id" serial PRIMARY KEY NOT NULL,
    "slug" varchar NOT NULL,
    "status" varchar DEFAULT 'draft' NOT NULL,
    "city" varchar NOT NULL,
    "target_keyword" varchar,
    "title" varchar NOT NULL,
    "intro" text,
    "hero_image_id" integer,
    "hero_image_url" varchar,
    "hero_cta_text" varchar DEFAULT 'J''estime mes revenus',
    "seo_meta_title" varchar,
    "seo_meta_description" text,
    "seo_canonical_url" varchar,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "pillar_pages_sections" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "block_type" varchar NOT NULL,
    "title" varchar,
    "text" text,
    "image_url" varchar,
    "image_position" varchar DEFAULT 'right',
    "cta_text" varchar,
    "cta_href" varchar,
    "items" jsonb
  );

  CREATE TABLE IF NOT EXISTS "pillar_pages_faq_items" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" varchar PRIMARY KEY NOT NULL,
    "question" varchar NOT NULL,
    "answer" text NOT NULL
  );
`)

await exec(`
  ALTER TABLE "pillar_pages_sections" ADD CONSTRAINT "pillar_pages_sections_parent_fk"
    FOREIGN KEY ("_parent_id") REFERENCES "pillar_pages"("id") ON DELETE CASCADE;
  ALTER TABLE "pillar_pages_faq_items" ADD CONSTRAINT "pillar_pages_faq_items_parent_fk"
    FOREIGN KEY ("_parent_id") REFERENCES "pillar_pages"("id") ON DELETE CASCADE;
`)

await exec(`
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
  CREATE INDEX IF NOT EXISTS "authors_created_at_idx" ON "authors" ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_slug_idx" ON "pages" ("slug");
  CREATE INDEX IF NOT EXISTS "pages_sections_parent_id_idx" ON "pages_sections" ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" ("slug");
  CREATE UNIQUE INDEX IF NOT EXISTS "location_pages_slug_idx" ON "location_pages" ("slug");
  CREATE UNIQUE INDEX IF NOT EXISTS "pillar_pages_slug_idx" ON "pillar_pages" ("slug");
  CREATE INDEX IF NOT EXISTS "pillar_pages_sections_parent_idx" ON "pillar_pages_sections" ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pillar_pages_faq_items_parent_idx" ON "pillar_pages_faq_items" ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_locales_locale_parent_unique" ON "pages_locales" ("_locale", "_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_locales_locale_parent_unique" ON "posts_locales" ("_locale", "_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "location_pages_locales_locale_parent_unique" ON "location_pages_locales" ("_locale", "_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "settings_locales_locale_parent_unique" ON "settings_locales" ("_locale", "_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "settings_nav_links_locales_locale_parent_unique" ON "settings_nav_links_locales" ("_locale", "_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "settings_footer_links_locales_locale_parent_unique" ON "settings_footer_links_locales" ("_locale", "_parent_id");
`)

await client.end()
console.log('Database migrations completed successfully.')
