import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import * as migration_20260618_init from './migrations/20260618_000000_init'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
    {
      slug: 'pages',
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'content', type: 'richText', localized: true, editor: lexicalEditor({}) },
        {
          name: 'seo',
          type: 'group',
          fields: [
            { name: 'title', type: 'text', localized: true },
            { name: 'description', type: 'textarea', localized: true },
            { name: 'keywords', type: 'text', localized: true },
          ],
        },
      ],
    },
    {
      slug: 'posts',
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'excerpt', type: 'textarea', localized: true },
        { name: 'content', type: 'richText', localized: true, editor: lexicalEditor({}) },
        { name: 'publishedAt', type: 'date' },
      ],
    },
    {
      slug: 'location-pages',
      fields: [
        { name: 'city', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'content', type: 'richText', localized: true, editor: lexicalEditor({}) },
      ],
    },
  ],
  globals: [
    {
      slug: 'settings',
      fields: [
        { name: 'siteTitle', type: 'text' },
        { name: 'siteDescription', type: 'textarea', localized: true },
        {
          name: 'navLinks',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
  ],
  localization: {
    locales: ['fr', 'en', 'es'],
    defaultLocale: 'fr',
    fallback: true,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    prodMigrations: [migration_20260618_init],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [],
})
