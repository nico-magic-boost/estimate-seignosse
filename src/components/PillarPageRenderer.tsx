import EstimateWidget from '@/components/EstimateWidget'
import PillarPageFaq from '@/components/PillarPageFaq'

// ── SVG Icons ───────────────────────────────────────────────────────────────

function IconDatabase() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="12" rx="16" ry="6" stroke="#007caa" strokeWidth="2.5"/>
      <path d="M8 12v8c0 3.314 7.163 6 16 6s16-2.686 16-6v-8" stroke="#007caa" strokeWidth="2.5" fill="none"/>
      <path d="M8 20v8c0 3.314 7.163 6 16 6s16-2.686 16-6v-8" stroke="#007caa" strokeWidth="2.5" fill="none"/>
    </svg>
  )
}
function IconChart() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="28" width="8" height="12" rx="2" stroke="#007caa" strokeWidth="2.5"/>
      <rect x="20" y="18" width="8" height="22" rx="2" stroke="#007caa" strokeWidth="2.5"/>
      <rect x="32" y="10" width="8" height="30" rx="2" stroke="#007caa" strokeWidth="2.5"/>
    </svg>
  )
}
function IconHome() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M6 22L24 8l18 14" stroke="#007caa" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M10 19v19a2 2 0 002 2h8v-9h8v9h8a2 2 0 002-2V19" stroke="#007caa" strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  )
}
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <polyline points="3,9 7,13 15,5" stroke="#007caa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function IconPeople() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="20" cy="18" r="7" stroke="white" strokeWidth="2"/>
      <path d="M6 44c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="38" cy="20" r="5" stroke="white" strokeWidth="2"/>
      <path d="M38 32c5.523 0 10 4.477 10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
function IconHouseDoc() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M8 26L28 10l20 16" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M13 23v21a2 2 0 002 2h10v-10h6v10h10a2 2 0 002-2V23" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="32" y="30" width="14" height="16" rx="2" stroke="white" strokeWidth="1.5"/>
      <line x1="35" y1="35" x2="43" y2="35" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="35" y1="39" x2="43" y2="39" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function IconStar() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <path d="M28 10l4.9 10.2 11.1 1.6-8 7.9 1.9 11.1L28 35.4l-9.9 5.4 1.9-11.1-8-7.9 11.1-1.6L28 10z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  )
}

// ── Types ───────────────────────────────────────────────────────────────────

type FaqItem = { question: string; answer: string }

type PillarPageData = {
  title: string
  city: string
  intro?: string
  heroCtaText?: string
  heroImageUrl?: string
  sections?: Array<{
    blockType: string
    title?: string
    text?: string
    ctaText?: string
  }>
  faqItems?: FaqItem[]
}

// ── Renderer ────────────────────────────────────────────────────────────────

export default function PillarPageRenderer({ page }: { page: PillarPageData }) {
  const city = page.city

  // Parse each section's stored JSON (full section data is serialised in `text`)
  const sections: any[] = (page.sections ?? []).map(s => {
    let data: Record<string, any> = {}
    try { data = JSON.parse(s.text ?? '{}') } catch { /* ignore */ }
    return { blockType: s.blockType, title: s.title, ctaText: s.ctaText, ...data }
  })

  const byType = (type: string): any => sections.find(s => s.type === type || s.blockType === type)

  const intro3cols  = byType('intro3cols')
  const whyEstimate = byType('whyEstimate')
  const marketData  = byType('marketData')
  const airbnb      = byType('airbnb')
  const legislation = byType('legislation')
  const whyUs       = byType('whyUs')
  const proNetwork  = byType('proNetwork')

  const introParas = (page.intro ?? '').split('\n\n').filter(Boolean)

  const proIcons = [IconPeople, IconHouseDoc, IconStar]

  return (
    <main>

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#007caa] to-[#17a3b5] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">{page.title}</h1>
            {introParas.map((p, i) => (
              <p key={i} className="text-white/90 mb-4 leading-relaxed">{p}</p>
            ))}
            <a
              href="#estimateur"
              className="inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors mt-4"
            >
              {page.heroCtaText || `J'estime mes revenus à ${city}`}
            </a>
          </div>
          {page.heroImageUrl && (
            <div className="flex-1 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={page.heroImageUrl}
                alt={`Estimateur location de vacances à ${city}`}
                className="rounded-2xl shadow-xl w-full max-w-md object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── 2. ESTIMATEUR ────────────────────────────────────────────────── */}
      <section id="estimateur" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#007caa] mb-8 text-center">
            Estimez gratuitement votre location saisonnière à {city}
          </h2>
          <EstimateWidget />
        </div>
      </section>

      {/* ── 3. VOTRE ESTIMATION (intro3cols) ─────────────────────────────── */}
      {intro3cols && (
        <section className="py-16 px-4 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#007caa] mb-6">{intro3cols.title}</h2>
            {intro3cols.intro && (
              <p className="text-gray-700 mb-10 leading-relaxed">{intro3cols.intro}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {([
                { Icon: IconCheck,    label: intro3cols.col1 },
                { Icon: IconDatabase, label: intro3cols.col2 },
                { Icon: IconHome,     label: intro3cols.col3 },
              ] as const).filter(item => item.label).map(({ Icon, label }, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16"><Icon /></div>
                  <p className="text-gray-700 text-sm leading-relaxed font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. POURQUOI ESTIMER (whyEstimate) ────────────────────────────── */}
      {whyEstimate && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#007caa] mb-6">{whyEstimate.title}</h2>
            {whyEstimate.intro && (
              <p className="text-gray-700 mb-6 leading-relaxed">{whyEstimate.intro}</p>
            )}
            <ul className="space-y-4">
              {((whyEstimate.bullets ?? []) as string[]).map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <IconCheck />
                  <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
            {whyEstimate.conclusion && (
              <p className="mt-6 text-gray-700 leading-relaxed">{whyEstimate.conclusion}</p>
            )}
          </div>
        </section>
      )}

      {/* ── 5. PRIX MOYEN (marketData) ────────────────────────────────────── */}
      {marketData && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-[#007caa] mb-10">{marketData.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {marketData.bloc1 && (
                <div className="flex flex-col gap-3">
                  <div className="w-14 h-14"><IconDatabase /></div>
                  <h3 className="text-base font-bold text-gray-900">{marketData.bloc1.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{marketData.bloc1.text}</p>
                </div>
              )}

              {marketData.bloc2 && (
                <div className="flex flex-col gap-3">
                  <div className="w-14 h-14"><IconChart /></div>
                  <h3 className="text-base font-bold text-gray-900">{marketData.bloc2.title}</h3>
                  {marketData.bloc2.text && (
                    <p className="text-gray-700 text-sm mb-2 leading-relaxed">{marketData.bloc2.text}</p>
                  )}
                  <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
                    {marketData.bloc2.hauteSaison && (
                      <li><strong>Haute saison</strong> : {marketData.bloc2.hauteSaison}</li>
                    )}
                    {marketData.bloc2.basseSaison && (
                      <li><strong>Basse saison</strong> : {marketData.bloc2.basseSaison}</li>
                    )}
                  </ul>
                </div>
              )}

              {marketData.bloc3 && (
                <div className="flex flex-col gap-3">
                  <div className="w-14 h-14"><IconChart /></div>
                  <h3 className="text-base font-bold text-gray-900">{marketData.bloc3.title}</h3>
                  <p className="text-gray-700 text-sm mb-2 leading-relaxed">
                    {marketData.bloc3.tauxOccupation && (
                      <>Taux d&apos;occupation : <strong>{marketData.bloc3.tauxOccupation}</strong>
                      {marketData.bloc3.nuitsParAn && <>, soit environ <strong>{marketData.bloc3.nuitsParAn}</strong></>}.
                      {marketData.bloc3.revenusAnnuels && <> Revenus annuels : <strong>{marketData.bloc3.revenusAnnuels}</strong>.</>}
                      </>
                    )}
                  </p>
                  {marketData.bloc3.plusPoints && (
                    <ul className="text-[#007caa] text-sm space-y-1 list-disc list-inside">
                      {(marketData.bloc3.plusPoints as string[]).map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {marketData.bloc4 && (
                <div className="flex flex-col gap-3">
                  <div className="w-14 h-14"><IconHome /></div>
                  <h3 className="text-base font-bold text-gray-900">{marketData.bloc4.title}</h3>
                  {(marketData.bloc4.moisHauteSaison || marketData.bloc4.revenusHauteSaison) && (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {marketData.bloc4.moisHauteSaison && (
                        <>La période <strong>{marketData.bloc4.moisHauteSaison}</strong> concentre une grande partie du chiffre d&apos;affaires. </>
                      )}
                      {marketData.bloc4.revenusHauteSaison && (
                        <>Revenus mensuels estimés : <strong>{marketData.bloc4.revenusHauteSaison}</strong>.</>
                      )}
                    </p>
                  )}
                  {marketData.bloc4.text && (
                    <p className="text-gray-700 text-sm leading-relaxed">{marketData.bloc4.text}</p>
                  )}
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* ── 6. AIRBNB ─────────────────────────────────────────────────────── */}
      {airbnb && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#007caa] mb-6">{airbnb.title}</h2>
            {airbnb.intro && (
              <p className="text-gray-700 mb-4 leading-relaxed">{airbnb.intro}</p>
            )}
            <ul className="space-y-2 mb-6">
              {((airbnb.bullets ?? []) as string[]).map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#007caa] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            {airbnb.conclusion && (
              <p className="text-gray-700 text-sm leading-relaxed">{airbnb.conclusion}</p>
            )}
          </div>
        </section>
      )}

      {/* ── 7. LÉGISLATION ────────────────────────────────────────────────── */}
      {legislation && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#007caa] mb-6">{legislation.title}</h2>
            <p className="text-gray-700 leading-relaxed">{legislation.text}</p>
          </div>
        </section>
      )}

      {/* ── 8. POURQUOI ESTIMATE.RENTALS (whyUs) ─────────────────────────── */}
      {whyUs && (
        <section className="py-16 px-4 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-[#007caa] mb-6">{whyUs.title}</h2>
              <ul className="space-y-4">
                {((whyUs.items ?? []) as Array<{ title: string; text: string }>).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <IconCheck />
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <strong>{item.title}</strong> : {item.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://estimate.rentals/wp-content/uploads/2025/09/Pourquoi-utiliser-estimate.rentals-quand-on-est-proprietaire-768x768.webp"
                alt={`Pourquoi utiliser estimate.rentals quand on est propriétaire à ${city}`}
                className="rounded-2xl shadow-xl w-full max-w-md object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── 9. RÉSEAU DE PROS (proNetwork) ───────────────────────────────── */}
      {proNetwork && (
        <section className="mesh-gradient py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-4">{proNetwork.title}</h2>
            {proNetwork.intro && (
              <p className="text-white/80 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
                {proNetwork.intro}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-10">
              {((proNetwork.services ?? []) as Array<{ title: string; text: string }>).map((service, i) => {
                const Icon = proIcons[i % proIcons.length]
                return (
                  <div key={i} className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 flex items-center justify-center"><Icon /></div>
                    <p className="text-white font-semibold text-sm leading-relaxed">{service.text}</p>
                  </div>
                )
              })}
            </div>
            <div className="text-center">
              <a
                href="#estimateur"
                className="inline-block bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors"
              >
                {proNetwork.ctaText || `Trouvez un professionnel à ${city}`}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── 10. FAQ ───────────────────────────────────────────────────────── */}
      {page.faqItems && page.faqItems.length > 0 && (
        <PillarPageFaq items={page.faqItems} />
      )}

      {/* ── 11. CTA FINAL ─────────────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#007caa] to-[#17a3b5] rounded-2xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl font-bold text-white leading-snug">
              Envie d&apos;estimer votre location de vacances à {city} ?
            </h2>
            <a
              href="/demander-une-demo"
              className="flex-shrink-0 bg-[#e8621a] hover:bg-[#cf5515] text-white font-semibold px-8 py-3 rounded-full transition-colors whitespace-nowrap"
            >
              Demander une démo
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
