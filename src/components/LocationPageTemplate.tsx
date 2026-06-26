import EstimateWidget from './EstimateWidget'
import RevealOnScroll from './RevealOnScroll'

interface LocationPageTemplateProps {
  city: string
}

export default function LocationPageTemplate({ city }: LocationPageTemplateProps) {
  return (
    <div>
      <RevealOnScroll />
      <section className="mesh-gradient-animated text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Estimez gratuitement votre location saisonnière à {city}
          </h1>
          <p className="text-lg text-white">
            Découvrez le potentiel locatif de votre bien à {city} en quelques secondes.
          </p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 py-12 reveal">
        <EstimateWidget />
      </div>
    </div>
  )
}
