import type { CollectionConfig } from 'payload'

export const LocationPages: CollectionConfig = {
  slug: 'location-pages',
  admin: {
    useAsTitle: 'city',
    defaultColumns: ['city', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', localized: true },
        { name: 'description', type: 'textarea', localized: true },
      ],
    },
  ],
}
