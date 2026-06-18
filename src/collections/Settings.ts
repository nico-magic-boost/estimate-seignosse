import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: { group: 'Configuration' },
  fields: [
    {
      name: 'siteTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'siteDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'footerText',
      type: 'text',
      localized: true,
    },
  ],
}
