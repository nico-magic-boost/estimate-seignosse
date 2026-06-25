import { useTranslations } from 'next-intl'
import DemoForm from '@/components/DemoForm'
import RevealOnScroll from '@/components/RevealOnScroll'

export default function DemoPage() {
  const t = useTranslations('demo')
  return (
    <div className="py-16 px-4">
      <RevealOnScroll />
      <div className="max-w-2xl mx-auto">
        <div className="reveal">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            <span className="gradient-text">{t('title')}</span>
          </h1>
          <p className="text-gray-600 text-center mb-10">{t('subtitle')}</p>
          <DemoForm />
        </div>
      </div>
    </div>
  )
}
