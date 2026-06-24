import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Article', plural: 'Articles' },
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
    defaultColumns: ['title', 'author', 'status', 'publishedAt'],
    description: 'Articles du blog Estimate Rentals.',
    components: {
      beforeListTable: ['@/components/admin/GenerateWithAI#GenerateWithAI'],
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
      admin: {
        position: 'sidebar',
        description: "Identifiant unique dans l'URL. Ex : pourquoi-integrer-un-simulateur",
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
        { label: 'Programme', value: 'scheduled' },
        { label: 'Publie', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'scheduledAt',
      type: 'date',
      label: 'Date de publication programmee',
      admin: {
        position: 'sidebar',
        condition: (data: Record<string, unknown>) => data?.status === 'scheduled',
        date: { pickerAppearance: 'dayAndTime' },
        description: "L'article sera publie a cette date.",
      },
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
      name: 'lastEditedAt',
      type: 'date',
      label: 'Date de mise a jour',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
        description: "Affiche dans la barre de metadonnees de l'article.",
      },
    },

    // ── Contenu principal ─────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      label: "Titre de l'article",
      localized: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Image de couverture (banniere)',
      admin: {
        description: 'Format recommande : 1200x480 px. Affichee en haut de l article.',
      },
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Introduction',
      localized: true,
      admin: {
        description: "Paragraphe d'accroche affiche sous le titre. 2 a 4 phrases.",
        rows: 4,
      },
    },

    // ── Sections ──────────────────────────────────────────────
    {
      name: 'sections',
      type: 'array',
      label: "Sections de l'article",
      localized: true,
      admin: {
        description: 'Chaque section correspond a un titre H2 avec son contenu.',
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
            description: 'Identifiant pour le sommaire. Ex : erreur-1.',
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

    // ── Resume ────────────────────────────────────────────────
    {
      name: 'summary',
      type: 'array',
      label: 'Ce qu il faut retenir (encadre teal)',
      admin: {
        description: 'Points cles affiches dans l encadre de conclusion. 3 a 5 points recommandes.',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Point cle',
        },
      ],
    },

    // ── CTA ───────────────────────────────────────────────────
    {
      name: 'cta',
      type: 'group',
      label: "Appel a l'action (bouton sidebar)",
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
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Titre SEO',
          admin: { description: "Si vide, le titre de l'article est utilise. Max 60 caracteres." },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta description',
          admin: { description: 'Resume affiche dans Google. Max 160 caracteres.', rows: 2 },
        },
      ],
    },
  ],
}
