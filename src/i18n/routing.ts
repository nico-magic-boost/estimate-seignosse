import { defineRouting } from 'next-intl/routing';
export const routing = defineRouting({
  locales: ['fr', 'en', 'es'],
  defaultLocale: 'fr',
  pathnames: {
    '/': '/',
    '/estimez-gratuitement': {
      fr: '/estimez-gratuitement',
      en: '/estimate-for-free',
      es: '/estime-gratis'
    },
    '/installer-estimateur': {
      fr: '/installer-estimateur',
      en: '/install-estimator',
      es: '/instalar-estimador'
    },
    '/qui-sommes-nous': {
      fr: '/qui-sommes-nous',
      en: '/who-are-we',
      es: '/quienes-somos'
    },
    '/tarifs': {
      fr: '/tarifs',
      en: '/pricing',
      es: '/precios'
    },
    '/demander-une-demo': {
      fr: '/demander-une-demo',
      en: '/request-a-demo',
      es: '/solicitar-demo'
    },
    '/actualites': {
      fr: '/actualites',
      en: '/news',
      es: '/actualidad'
    },
    '/actualites/[slug]': {
      fr: '/actualites/[slug]',
      en: '/news/[slug]',
      es: '/actualidad/[slug]'
    },
    '/mentions-legales': {
      fr: '/mentions-legales',
      en: '/legal-notices',
      es: '/aviso-legal'
    },
    '/politique-de-cookies': {
      fr: '/politique-de-cookies',
      en: '/cookie-policy',
      es: '/politica-de-cookies'
    }
  }
});
