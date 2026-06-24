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

    // ── Page Builder Sections ─────────────────────────────────
    {
      name: 'sections',
      type: 'array',
      label: 'Sections (Page Builder)',
      admin: {
        description: 'Construisez la page section par section. Chaque section correspond à un bloc de contenu affiché sur la page.',
      },
      fields: [
        {
          name: 'blockType',
          type: 'select',
          required: true,
          label: 'Type de bloc',
          options: [
            { label: 'Hero', value: 'hero' },
            { label: 'Liste de fonctionnalités', value: 'featureList' },
            { label: 'Texte + Image', value: 'textImage' },
            { label: 'FAQ', value: 'faq' },
            { label: 'Bannière CTA', value: 'ctaBanner' },
            { label: 'Texte enrichi', value: 'richText' },
          ],
        },
        // ── Hero fields ──────────────────────────────────────
        {
          name: 'headline',
          type: 'text',
          label: 'Titre principal (H1)',
          admin: {
            condition: (_, siblingData) => siblingData?.blockType === 'hero',
          },
        },
        {
          name: 'subheadline',
          type: 'textarea',
          label: 'Sous-titre',
          admin: {
            condition: (_, siblingData) => ['hero'].includes(siblingData?.blockType),
          },
        },
        {
          name: 'socialProof',
          type: 'text',
          label: 'Preuve sociale (ex: +100 professionnels)',
          admin: {
            condition: (_, siblingData) => siblingData?.blockType === 'hero',
          },
        },
        // ── featureList / textImage / ctaBanner fields ───────
        {
          name: 'title',
          type: 'text',
          label: 'Titre de section',
          admin: {
            condition: (_, siblingData) => ['featureList', 'textImage', 'ctaBanner'].includes(siblingData?.blockType),
          },
        },
        {
          name: 'intro',
          type: 'textarea',
          label: 'Introduction / accroche',
          admin: {
            condition: (_, siblingData) => ['featureList'].includes(siblingData?.blockType),
          },
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Texte',
          admin: {
            condition: (_, siblingData) => siblingData?.blockType === 'textImage',
          },
        },
        // ── CTA fields (hero, featureList, textImage, ctaBanner)
        {
          name: 'ctaText',
          type: 'text',
          label: 'Texte du bouton CTA',
          admin: {
            condition: (_, siblingData) => ['hero', 'featureList', 'textImage', 'ctaBanner'].includes(siblingData?.blockType),
          },
        },
        {
          name: 'ctaHref',
          type: 'text',
          label: 'Lien du bouton CTA',
          admin: {
            condition: (_, siblingData) => ['hero', 'featureList', 'textImage', 'ctaBanner'].includes(siblingData?.blockType),
          },
        },
        // ── Image fields ─────────────────────────────────────
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          admin: {
            condition: (_, siblingData) => ['textImage', 'hero'].includes(siblingData?.blockType),
          },
        },
        {
          name: 'imagePosition',
          type: 'select',
          label: 'Position de l\'image',
          defaultValue: 'right',
          options: [
            { label: 'Gauche', value: 'left' },
            { label: 'Droite', value: 'right' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.blockType === 'textImage',
          },
        },
        // ── Items (FAQ, featureList items, hero badges) ──────
        {
          name: 'items',
          type: 'json',
          label: 'Éléments (JSON)',
          admin: {
            description: 'FAQ: [{question, answer}] | featureList: [{title, text}] | Hero badges: [{label}]',
            condition: (_, siblingData) => ['faq', 'featureList', 'hero'].includes(siblingData?.blockType),
          },
        },
        // ── richText content ─────────────────────────────────
        {
          name: 'content',
          type: 'richText',
          label: 'Contenu enrichi',
          admin: {
            condition: (_, siblingData) => siblingData?.blockType === 'richText',
          },
        },
      ],
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
