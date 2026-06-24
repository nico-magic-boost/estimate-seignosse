import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    useAsTitle: 'title',
    group: 'Site',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    description: 'Pages statiques du site.',
  },
  fields: [
    // ── Sidebar ───────────────────────────────────────────────
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug URL',
      admin: {
        position: 'sidebar',
        description: 'Identifiant dans l\'URL. Ex : tarifs, qui-sommes-nous',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'published',
      label: 'Statut',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'Publié', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },

    // ── Contenu ───────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre de la page',
      localized: true,
    },
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Titre hero (H1 affiché)',
      localized: true,
      admin: { description: 'Si vide, le titre de la page est utilisé.' },
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      label: 'Sous-titre hero',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Contenu principal',
      localized: true,
    },

    // ── SEO ───────────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      // collapsed by default
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Titre SEO',
          localized: true,
          admin: { description: 'Max 60 caractères.' },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Méta description',
          localized: true,
          admin: { description: 'Max 160 caractères.', rows: 2 },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Image Open Graph',
          admin: { description: 'Image affichée lors du partage sur les réseaux sociaux. 1200×630 px.' },
        },
      ],
    },
  ],
}
