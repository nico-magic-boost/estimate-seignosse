import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Réglages du site',
  admin: { group: 'Configuration' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Général',
          fields: [
            {
              name: 'siteTitle',
              type: 'text',
              label: 'Nom du site',
              defaultValue: 'Estimate Rentals',
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              label: 'Description du site',
              localized: true,
              admin: { rows: 3 },
            },
            {
              name: 'contactEmail',
              type: 'email',
              label: 'Email de contact',
            },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navLinks',
              type: 'array',
              label: 'Liens de navigation',
              admin: { description: 'Ordre d\'apparition dans la navbar.' },
              fields: [
                { name: 'label', type: 'text', required: true, label: 'Libellé', localized: true },
                { name: 'href', type: 'text', required: true, label: 'Lien' },
                {
                  name: 'highlight',
                  type: 'checkbox',
                  label: 'Mettre en avant (bouton CTA)',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerText',
              type: 'text',
              label: 'Texte copyright',
              localized: true,
              admin: { description: 'Ex : © 2025 Estimate Rentals — Tous droits réservés' },
            },
            {
              name: 'footerLinks',
              type: 'array',
              label: 'Liens footer',
              fields: [
                { name: 'label', type: 'text', required: true, label: 'Libellé', localized: true },
                { name: 'href', type: 'text', required: true, label: 'Lien' },
              ],
            },
          ],
        },
        {
          label: 'SEO global',
          fields: [
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Image Open Graph par défaut',
              admin: { description: 'Utilisée quand une page n\'a pas d\'image spécifique. 1200×630 px.' },
            },
            {
              name: 'googleSiteVerification',
              type: 'text',
              label: 'Google Search Console — code de vérification',
            },
            {
              name: 'analyticsId',
              type: 'text',
              label: 'Google Analytics / GTM ID',
              admin: { description: 'Ex : G-XXXXXXXXXX ou GTM-XXXXXXX' },
            },
          ],
        },
      ],
    },
  ],
}
