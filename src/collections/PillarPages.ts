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
            { label: 'Votre estimation (3 colonnes)', value: 'intro3cols' },
            { label: 'Pourquoi estimer', value: 'whyEstimate' },
            { label: 'Grille données marché', value: 'marketData' },
            { label: 'Airbnb / courte durée', value: 'airbnb' },
            { label: 'Législation', value: 'legislation' },
            { label: 'Pourquoi estimate.rentals', value: 'whyUs' },
            { label: 'Réseau de pros (gradient)', value: 'proNetwork' },
            { label: 'Texte + image', value: 'textImage' },
            { label: 'Liste de features', value: 'featureList' },
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
          type: 'json',
          label: 'Éléments (JSON)',
          admin: { description: 'Stockage JSON interne — données accessibles via le champ "Texte / intro".' },
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
