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
      admin: { description: 'Ex : Co-fondateur, Rédactrice, Expert SEO…' },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biographie courte',
      admin: { description: 'Présentée sous les articles et sur la page auteur.' },
    },
    {
      name: 'writingTone',
      type: 'textarea',
      label: 'Ton de rédaction',
      admin: {
        description: 'Décrivez le style, le registre et l\'angle éditorial de cet auteur. Utilisé comme référence pour la rédaction de contenus.',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo de profil',
    },
  ],
}

