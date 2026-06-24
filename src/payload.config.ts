import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Authors } from './collections/Authors'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Settings } from './collections/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    theme: 'light',
    meta: {
      titleSuffix: '— Estimate Rentals',
    },
    components: {
      graphics: {
        Logo: '@/components/admin/Logo#AdminLogo',
        Icon: '@/components/admin/Icon#AdminIcon',
      },
      beforeDashboard: ['@/components/admin/Dashboard#BeforeDashboard'],
      beforeLogin: ['@/components/admin/BeforeLogin#BeforeLogin'],
    },
    importMap: {
      autoGenerate: false,
    },
  },

  collections: [
    // Auth
    {
      slug: 'users',
      labels: { singular: 'Utilisateur', plural: 'Utilisateurs' },
      auth: true,
      admin: {
        useAsTitle: 'email',
        group: 'Configuration',
        description: 'Comptes administrateurs du back office.',
        defaultColumns: ['email', 'updatedAt'],
      },
      fields: [
        { name: 'name', type: 'text', label: 'Nom complet' },
      ],
    },

    // Médias
    Media,

    // Site
    Pages,

    // Blog
    Authors,
    Posts,
  ],

  globals: [Settings],

  editor: lexicalEditor({}),

  localization: {
    locales: [
      { label: 'Français', code: 'fr' },
      { label: 'English', code: 'en' },
      { label: 'Español', code: 'es' },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  plugins: [],
})
