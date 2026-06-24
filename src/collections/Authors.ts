import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: { singular: 'Auteur', plural: 'Auteurs' },
  admin: {
    useAsTitle: 'name',
    group: 'Blog',
    description: 'Auteurs des articles du blog.',
    defaultColumns: ['name', 'role', 'updatedAt'],
  },
  fields: [
    // ── Identité ────────────────────────────────────────────────────────────
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nom complet',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Rôle / Titre',
      admin: { description: 'Ex : Co-fondateur & CEO, Rédactrice, Expert SEO…' },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biographie courte',
      admin: { description: 'Présentée sous les articles et sur la page auteur (2-3 phrases).' },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo de profil',
    },

    // ── Ton éditorial ───────────────────────────────────────────────────────
    {
      name: 'writingTone',
      type: 'textarea',
      label: 'Ton de rédaction',
      admin: {
        description: 'Style, registre et angle éditorial. Référence pour la rédaction et la relecture des contenus signés par cet auteur.',
      },
    },

    // ── EEAT — Expertise, Authoritativeness, Trustworthiness ───────────────
    {
      type: 'collapsible',
      label: 'Signaux EEAT (Google)',
      admin: { description: 'Ces informations renforcent la crédibilité de l\'auteur aux yeux de Google (E-E-A-T).' },
      fields: [
        {
          name: 'linkedinUrl',
          type: 'text',
          label: 'Profil LinkedIn',
          admin: { description: 'https://www.linkedin.com/in/…' },
        },
        {
          name: 'twitterUrl',
          type: 'text',
          label: 'Profil X / Twitter',
          admin: { description: 'https://x.com/…' },
        },
        {
          name: 'websiteUrl',
          type: 'text',
          label: 'Site web personnel',
          admin: { description: 'https://…' },
        },
        {
          name: 'expertise',
          type: 'text',
          label: 'Domaines d\'expertise',
          admin: { description: 'Ex : Location saisonnière, Revenue management, SaaS immobilier' },
        },
        {
          name: 'credentials',
          type: 'textarea',
          label: 'Références & accréditations',
          admin: { description: 'Diplômes, certifications, années d\'expérience, publications notables…' },
        },
      ],
    },
  ],
}
