import type { CollectionConfig } from 'payload'

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://estimate.rentals'

export const PillarPages: CollectionConfig = {
  slug: 'pillar-pages',
  labels: { singular: 'Page Pilier', plural: 'Pages Piliers' },
  admin: {
    useAsTitle: 'title',
    group: 'Pages Piliers',
    defaultColumns: ['title', 'city', 'status', 'updatedAt'],
    description: 'Pages de destination SEO par ville (ex : Estimation location vacances à Arcachon).',
    preview: (doc) => {
      const slug = (doc as any).slug
      if (!slug) return null
      return `${SITE_URL}/fr/${slug}`
    },
    components: {
      beforeListTable: ['@/components/admin/GeneratePillarPage#GeneratePillarPage'],
    },
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === 'create' && data && !data.slug && data.city) {
          data.slug = slugify(data.city as string)
        }
        return data
      },
    ],
  },
  fields: [
    // ── Sidebar ──────────────────────────────────────────────
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug URL',
      admin: {
        position: 'sidebar',
        description: 'Ex : biarritz → /fr/biarritz (auto-généré depuis la ville, modifiable)',
      },
    },
    {
      name: 'previewLink',
      type: 'ui',
      label: 'Prévisualisation',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/admin/PillarPagePreview#PillarPagePreview',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      label: 'Statut',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'Programmé', value: 'scheduled' },
        { label: 'Généré', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'Ville',
      admin: { position: 'sidebar', description: 'Ex : Biarritz' },
    },
    {
      name: 'targetKeyword',
      type: 'text',
      label: 'Mot-clé cible',
      admin: { position: 'sidebar' },
    },

    // ── Contenu ──────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre H1',
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Introduction hero',
    },
    {
      name: 'heroImageUrl',
      type: 'text',
      label: 'Image hero (URL)',
      admin: { description: 'URL WP ou CDN. Ex : https://estimate.rentals/wp-content/uploads/...' },
    },
    {
      name: 'heroCtaText',
      type: 'text',
      label: 'Texte bouton CTA hero',
      defaultValue: "J'estime mes revenus",
    },

    // ── Sections (générées par IA, éditables) ────────────────
    {
      name: 'sections',
      type: 'array',
      label: 'Sections de contenu',
      admin: { description: 'Chaque section correspond à un bloc de la page (données marché, législation, etc.)' },
      fields: [
        {
          name: 'blockType',
          type: 'select',
          required: true,
          label: 'Type',
          options: [
            { label: 'Votre estimation (3 colonnes)', value: 'intro3cols' },
            { label: 'Pourquoi estimer', value: 'whyEstimate' },
            { label: 'Données marché', value: 'marketData' },
            { label: 'Airbnb / courte durée', value: 'airbnb' },
            { label: 'Législation', value: 'legislation' },
            { label: 'Pourquoi estimate.rentals', value: 'whyUs' },
            { label: 'Réseau de pros', value: 'proNetwork' },
            { label: 'Texte libre', value: 'richText' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titre H2',
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Contenu (JSON généré par IA)',
          admin: { description: 'Données complètes du bloc au format JSON. Modifiable manuellement.' },
        },
      ],
    },

    // ── FAQ ──────────────────────────────────────────────────
    {
      name: 'faqItems',
      type: 'array',
      label: 'FAQ',
      fields: [
        { name: 'question', type: 'text', required: true, label: 'Question' },
        { name: 'answer', type: 'textarea', required: true, label: 'Réponse' },
      ],
    },

    // ── SEO ──────────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta Title', admin: { description: '55–65 caractères' } },
        { name: 'metaDescription', type: 'textarea', label: 'Meta Description', admin: { description: '150–160 caractères' } },
      ],
    },
  ],
}
