import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Article', plural: 'Articles' },
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
    defaultColumns: ['title', 'author', 'status', 'publishedAt'],
    description: 'Articles du blog Estimate Rentals.',
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
        description: 'Identifiant unique dans l\'URL. Ex : pourquoi-integrer-un-simulateur',
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
        { label: 'Publié', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      label: 'Auteur',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Date de publication',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
      },
    },
    {
      name: 'updatedAt',
      type: 'date',
      label: 'Date de mise à jour',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
        description: 'Affiché dans la barre de métadonnées de l\'article.',
      },
    },

    // ── Contenu principal ─────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titre de l\'article',
      localized: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de couverture (bannière)',
      admin: {
        description: 'Format recommandé : 1200×480 px. Affichée en haut de l\'article.',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Introduction',
      localized: true,
      admin: {
        description: 'Paragraphe d\'accroche affiché sous le titre. 2 à 4 phrases.',
        rows: 4,
      },
    },

    // ── Sections ──────────────────────────────────────────────
    {
      name: 'sections',
      type: 'array',
      label: 'Sections de l\'article',
      localized: true,
      admin: {
        description: 'Chaque section correspond à un titre H2 avec son contenu.',
        
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Titre (H2)',
        },
        {
          name: 'anchor',
          type: 'text',
          label: 'Ancre URL',
          admin: {
            description: 'Identifiant pour le sommaire. Ex : erreur-1. Généré depuis le titre si vide.',
          },
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Contenu',
          admin: {
            description: 'Utilisez les styles H3 pour les sous-sections, les listes pour les bullets.',
          },
        },
      ],
    },

    // ── Résumé ────────────────────────────────────────────────
    {
      name: 'summary',
      type: 'array',
      label: '"Ce qu\'il faut retenir" (encadré teal)',
      admin: {
        description: 'Points clés affichés dans l\'encadré de conclusion. 3 à 5 points recommandés.',
        
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Point clé',
        },
      ],
    },

    // ── CTA ───────────────────────────────────────────────────
    {
      name: 'cta',
      type: 'group',
      label: 'Appel à l\'action (bouton sidebar)',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Texte du bouton',
          defaultValue: 'Essai gratuit',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Lien',
          defaultValue: '/estimez-gratuitement',
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
          admin: { description: 'Si vide, le titre de l\'article est utilisé. Max 60 caractères.' },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Méta description',
          admin: { description: 'Résumé affiché dans Google. Max 160 caractères.', rows: 2 },
        },
      ],
    },
  ],
}
