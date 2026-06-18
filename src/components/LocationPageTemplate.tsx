import EstimateWidget from './EstimateWidget'

interface LocationPageTemplateProps {
  city: string
}

export default function LocationPageTemplate({ city }: LocationPageTemplateProps) {
  return (
    <div>
      <section className="bg-gradient-to-br from-[#007caa] to-[#17a3b5] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Estimez gratuitement votre location saisonnière à {city}
          </h1>
          <p className="text-lg text-white/90">
            Découvrez le potentiel locatif de votre bien à {city} en quelques secondes.
          </p>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <EstimateWidget />
      </div>
    </div>
  )
}
