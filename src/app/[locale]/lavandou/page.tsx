import RevealOnScroll from '@/components/RevealOnScroll'
import EstimateWidget from '@/components/EstimateWidget'

export default function Page() {
  return (
    <>
      <RevealOnScroll />
      <div>
        <section className="bg-gradient-to-br from-[#007caa] to-[#17a3b5] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center reveal">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Estimez gratuitement votre location saisonnière à{' '}
              <span className="gradient-text">Le Lavandou</span>
            </h1>
            <p className="text-lg text-white">
              Découvrez le potentiel locatif de votre bien à Le Lavandou en quelques secondes.
            </p>
          </div>
        </section>
        <div className="max-w-4xl mx-auto px-4 py-12 reveal">
          <EstimateWidget />
        </div>
      </div>
    </>
  )
}
