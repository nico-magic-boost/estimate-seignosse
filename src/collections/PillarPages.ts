import type { CollectionConfig } from 'payload'

export const PillarPages: CollectionConfig = {
  slug: 'pillar-pages',
  labels: { singular: 'Page Pilier', plural: 'Pages Piliers' },
  admin: {
    useAsTitle: 'title',
    group: 'Pages Piliers',
    defaultColumns: ['title', 'city', 'targetKeyword', 'status', 'updatedAt'],
    description: 'Pages de destination SEO par ville (ex : Estimation location vacances à Arcachon).',
    components: {
      beforeListTable: ['@/components/admin/GeneratePillarPage#GeneratePillarPage'],
    },
  },
  fields: [
    // ── Sidebar ──────────────────────────────────────────────
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug URL',
      admin: { position: 'sidebar', description: 'Ex : arcachon → /arcachon' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      label: 'Statut',
      options: [
        { label: 'Brouillon', value: 'draft' },
        { label: 'Publié', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'Ville',
      admin: { position: 'sidebar', description: 'Ex : Arcachon' },
    },
    {
      name: 'targetKeyword',
      type: 'text',
      label: 'Mot-clé cible principal',
      admin: {
        position: 'sidebar',
        description: 'Ex : Estimation location de vacances à Arcachon',
      },
    },

    // ── Contenu ──────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre H1',
      admin: { description: 'Titre principal de la page (balise H1)' },
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Introduction (hero)',
      admin: { description: 'Texte d\'accroche affiché sous le H1 dans le hero.' },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Image hero',
    },
    {
      name: 'heroImageUrl',
      type: 'text',
      label: 'Image hero (URL externe)',
      admin: {
        description: 'URL externe si l\'image est hébergée sur WP ou CDN.',
        condition: (data) => !data?.heroImage,
      },
    },
    {
      name: 'heroCtaText',
      type: 'text',
      label: 'Texte du bouton CTA hero',
      defaultValue: 'J\'estime mes revenus',
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Sections de contenu',
      admin: { description: 'Sections affichées après le hero (données marché, airbnb, législation, etc.)' },
      fields: [
        {
          name: 'blockType',
          type: 'select',
          required: true,
          label: 'Type de bloc',
          options: [
            { label: 'Texte + image', value: 'textImage' },
            { label: 'Liste de features', value: 'featureList' },
            { label: 'Grille données marché', value: 'marketData' },
            { label: 'Réseau de pros (gradient)', value: 'proNetwork' },
            { label: 'Bannière CTA', value: 'ctaBanner' },
            { label: 'Texte libre (richText)', value: 'richText' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Titre (H2)',
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Texte / intro',
        },
        {
          name: 'imageUrl',
          type: 'text',
          label: 'Image (URL externe)',
        },
        {
          name: 'imagePosition',
          type: 'select',
          label: 'Position image',
          defaultValue: 'right',
          options: [
            { label: 'Droite', value: 'right' },
            { label: 'Gauche', value: 'left' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.blockType === 'textImage',
          },
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'Texte CTA',
        },
        {
          name: 'ctaHref',
          type: 'text',
          label: 'Lien CTA',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Éléments (features, FAQ, données…)',
          fields: [
            { name: 'icon', type: 'text', label: 'Icône (emoji ou texte)' },
            { name: 'title', type: 'text', label: 'Titre / question' },
            { name: 'text', type: 'textarea', label: 'Texte / réponse' },
          ],
        },
      ],
    },
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
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
          admin: { description: '55–65 caractères recommandés' },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          admin: { description: '150–160 caractères recommandés' },
        },
        {
          name: 'canonicalUrl',
          type: 'text',
          label: 'URL canonique',
        },
      ],
    },
  ],
}
