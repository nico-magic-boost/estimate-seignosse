import Image from 'next/image'
import { LexicalRenderer } from './LexicalRenderer'

// ── Hero ──────────────────────────────────────────────────────────────────

function HeroSection({ section }: { section: any }) {
  const badges: { label: string }[] = Array.isArray(section.items) ? section.items : []
  return (
    <section className="relative bg-white dot-grid py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          {section.headline && (
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              {section.headline}
            </h1>
          )}
          {section.subheadline && (
            <p className="text-lg text-gray-600 mb-7 leading-relaxed">{section.subheadline}</p>
          )}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {badges.map((b, i) => (
                <span key={i} className="bg-[#e8f5fb] text-[#007caa] text-sm font-semibold px-4 py-1.5 rounded-full">
                  {b.label}
                </span>
              ))}
            </div>
          )}
          {section.ctaText && section.ctaHref && (
            <a
              href={section.ctaHref}
              className="btn-shimmer inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors text-base"
            >
              {section.ctaText}
            </a>
          )}
          {section.socialProof && (
            <p className="mt-3 text-xs text-gray-400">{section.socialProof}</p>
          )}
        </div>
        {section.image?.url && (
          <div className="flex-1">
            <Image
              src={section.image.url}
              alt={section.image.alt ?? ''}
              width={600}
              height={420}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-2xl shadow-xl w-full object-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}

// ── FeatureList ───────────────────────────────────────────────────────────

function FeatureListSection({ section }: { section: any }) {
  const items: { title: string; text: string }[] = Array.isArray(section.items) ? section.items : []
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {section.title && (
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{section.title}</h2>
        )}
        {section.intro && (
          <p className="text-gray-600 mb-8 leading-relaxed">{section.intro}</p>
        )}
        {items.length > 0 && (
          <ul className="space-y-5 mb-10">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#007caa] mt-1 flex-shrink-0">&#10004;</span>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.title && <strong>{item.title} : </strong>}
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        )}
        {section.ctaText && section.ctaHref && (
          <a
            href={section.ctaHref}
            className="btn-shimmer inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-7 py-3 rounded-full transition-colors"
          >
            {section.ctaText}
          </a>
        )}
      </div>
    </section>
  )
}

// ── TextImage ─────────────────────────────────────────────────────────────

function TextImageSection({ section }: { section: any }) {
  const imageLeft = section.imagePosition === 'left'
  const textBlock = (
    <div className="flex-1">
      {section.title && (
        <h2 className="text-3xl font-bold text-gray-900 mb-5">{section.title}</h2>
      )}
      {section.text && (
        <p className="text-gray-600 leading-relaxed mb-8">{section.text}</p>
      )}
      {section.ctaText && section.ctaHref && (
        <a
          href={section.ctaHref}
          className="inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm"
        >
          {section.ctaText}
        </a>
      )}
    </div>
  )
  const imageBlock = section.image?.url ? (
    <div className="flex-1">
      <Image
        src={section.image.url}
        alt={section.image.alt ?? ''}
        width={500}
        height={380}
        className="rounded-2xl w-full object-cover shadow-lg"
      />
    </div>
  ) : null

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {imageLeft ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────────────

function FaqSection({ section }: { section: any }) {
  const items: { question: string; answer: string }[] = Array.isArray(section.items) ? section.items : []
  if (items.length === 0) return null
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto space-y-3">
        {items.map((item, i) => (
          <details key={i} className="border border-gray-200 rounded-lg">
            <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer font-medium text-gray-800 text-sm list-none">
              <span className="text-[#007caa]">&#10004;</span> {item.question}
            </summary>
            <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

// ── CtaBanner ─────────────────────────────────────────────────────────────

function CtaBannerSection({ section }: { section: any }) {
  return (
    <section className="mesh-gradient py-14 px-4">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {section.title && (
          <h2 className="text-2xl font-bold text-white text-center md:text-left leading-snug">
            {section.title}
          </h2>
        )}
        {section.ctaText && section.ctaHref && (
          <a
            href={section.ctaHref}
            className="flex-shrink-0 bg-white text-[#007caa] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            {section.ctaText}
          </a>
        )}
      </div>
    </section>
  )
}

// ── RichText ──────────────────────────────────────────────────────────────

function RichTextSection({ section }: { section: any }) {
  if (!section.content) return null
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-lg">
        <LexicalRenderer content={section.content} />
      </div>
    </section>
  )
}

// ── Main renderer ─────────────────────────────────────────────────────────

export function PageSectionRenderer({ sections }: { sections: any[] }) {
  if (!sections?.length) return null
  return (
    <>
      {sections.map((section, i) => {
        switch (section.blockType) {
          case 'hero':
            return <HeroSection key={section.id ?? i} section={section} />
          case 'featureList':
            return <FeatureListSection key={section.id ?? i} section={section} />
          case 'textImage':
            return <TextImageSection key={section.id ?? i} section={section} />
          case 'faq':
            return <FaqSection key={section.id ?? i} section={section} />
          case 'ctaBanner':
            return <CtaBannerSection key={section.id ?? i} section={section} />
          case 'richText':
            return <RichTextSection key={section.id ?? i} section={section} />
          default:
            return null
        }
      })}
    </>
  )
}
