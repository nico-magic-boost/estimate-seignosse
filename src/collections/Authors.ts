import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: { singular: 'Auteur', plural: 'Auteurs' },
  admin: {
    useAsTitle: 'name',
    group: 'Blog',
    description: 'Auteurs des articles du blog.',
    defaultColumns: ['name', 'updatedAt'],
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
      admin: { description: 'Ex : Rédactrice, Expert SEO…' },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biographie courte',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo de profil',
    },
  ],
}
