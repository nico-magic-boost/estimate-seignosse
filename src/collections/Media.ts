import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Média', plural: 'Médias' },
  admin: {
    useAsTitle: 'filename',
    group: 'Médias',
    description: 'Images et fichiers utilisés sur le site.',
  },
  upload: {
    staticDir: '../public/media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'hero', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texte alternatif (SEO & accessibilité)',
      admin: { description: 'Décrivez l\'image en une phrase courte.' },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Légende (optionnelle)',
    },
  ],
}
