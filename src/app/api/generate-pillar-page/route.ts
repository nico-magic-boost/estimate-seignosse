import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getPayload } from 'payload'
import config from '@payload-config'

export const maxDuration = 300 // 5 min — génération Claude peut prendre 30-60s

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY non configurée.' }, { status: 500 })
  }

  const body = await req.json()
  const { city, targetKeyword } = body as { city: string; targetKeyword?: string }

  if (!city) return NextResponse.json({ error: 'city requis' }, { status: 400 })

  const keyword = targetKeyword || `Estimation location de vacances à ${city}`

  const systemPrompt = `Tu es un expert SEO spécialisé dans la location saisonnière en France.
Tu génères des pages piliers ultra-optimisées pour se positionner sur des requêtes locales comme "estimation location de vacances à [ville]".

STRUCTURE DE RÉFÉRENCE (page Arcachon à reproduire pour chaque ville) :
1. hero : titre H1, intro (2 paragraphes), CTA
2. sections de contenu détaillées adaptées à la ville :
   - "Votre estimation de location de vacances à [ville]" : présentation de l'outil + 3 features
   - "Pourquoi estimer le prix…" : 5 critères (emplacement, capacité, équipements, période, prix marché)
   - "Prix moyen d'une location de vacances à [ville]" : 4 blocs (données marché, prix moyen, taux d'occupation, revenus haute saison) avec chiffres RÉELS estimés pour cette ville
   - "Estimation Airbnb et location courte durée à [ville]" : contexte + 4 points
   - "Location de vacances : la législation à [ville]" : réglementation locale réelle
   - "Pourquoi utiliser estimate.rentals…" : 4 bénéfices (checklist)
   - "Un réseau de professionnels à votre service" : 3 services
3. faqItems : 6 questions/réponses adaptées à la ville
4. CTA final

RÈGLES ABSOLUES :
- Chiffres de marché RÉALISTES pour la ville (prix nuit, taux d'occupation, revenus annuels)
- Législation EXACTE pour la ville (enregistrement obligatoire ? durée max ? classement ?)
- Quartiers et zones géographiques RÉELS de la ville
- Mots clés locaux naturellement intégrés
- Zéro remplissage, valeur à chaque paragraphe
- Ton professionnel, pas de style IA générique

RÉPONDS UNIQUEMENT EN JSON STRICT.`

  const userPrompt = `Ville : ${city}
Mot-clé cible : ${keyword}

Génère la page pilier complète en JSON :
{
  "slug": "slug-ville",
  "title": "Titre H1 SEO (60-70 chars, mot-clé au début)",
  "targetKeyword": "${keyword}",
  "hero": {
    "intro": "2 paragraphes d'accroche (séparés par \\n\\n)",
    "ctaText": "J'estime mes revenus à ${city}"
  },
  "sections": [
    {
      "id": "votre-estimation",
      "type": "intro3cols",
      "title": "Votre estimation de location de vacances à ${city}",
      "intro": "Paragraphe introductif avec contexte local (quartiers, spécificités)",
      "col1": "Feature 1 : Gratuit, instantané et sans engagement",
      "col2": "Feature 2 : données marché locales ${city}",
      "col3": "Feature 3 : conçu pour propriétaires location courte durée"
    },
    {
      "id": "pourquoi-estimer",
      "type": "whyEstimate",
      "title": "Pourquoi estimer le prix de votre location de vacances à ${city} ?",
      "intro": "Paragraphe intro",
      "bullets": ["critère 1 emplacement", "critère 2 capacité", "critère 3 équipements", "critère 4 période", "critère 5 prix marché"],
      "conclusion": "Phrase sur risque surestimation/sous-estimation à ${city}"
    },
    {
      "id": "prix-moyen",
      "type": "marketData",
      "title": "Prix moyen d'une location de vacances à ${city}",
      "bloc1": { "title": "Données du marché", "text": "Contexte marché local ${city}" },
      "bloc2": { "title": "Prix moyen à ${city}", "prixNuit": "XXX €", "hauteSaison": "XXX–XXX € (mois–mois)", "basseSaison": "XXX–XXX €", "text": "Explication saisonnalité" },
      "bloc3": { "title": "Taux d'occupation et rentabilité", "tauxOccupation": "XX–XX %", "nuitsParAn": "XXX nuits", "revenusAnnuels": "XX 000 à XX 000 € par an", "plusPoints": ["biens plage", "logements extérieur", "biens bien notés"] },
      "bloc4": { "title": "Revenus haute saison à ${city}", "moisHauteSaison": "juin–septembre", "revenusHauteSaison": "X 000 à X 000 € mensuels", "text": "Explication" },
      "encart": { "title": "Pourquoi ces données sont essentielles", "bullets": ["saisonnalité locale", "loyers observés", "taux d'occupation", "concurrence plateformes"], "conclusion": "Phrase CTA estimation" }
    },
    {
      "id": "airbnb",
      "type": "airbnb",
      "title": "Estimation Airbnb et location courte durée à ${city}",
      "intro": "Positionnement de ${city} dans l'offre courte durée",
      "bullets": ["concurrence locale", "réglementation", "durée maximale", "attentes voyageurs"],
      "conclusion": "Phrase sur le simulateur"
    },
    {
      "id": "legislation",
      "type": "legislation",
      "title": "Location de vacances : la législation à ${city}",
      "text": "Réglementation EXACTE et à jour pour ${city} (enregistrement, déclaration mairie, changement d'usage, durée max résidence principale...)"
    },
    {
      "id": "pourquoi-estimate",
      "type": "whyUs",
      "title": "Pourquoi utiliser estimate.rentals quand on est propriétaire à ${city} ?",
      "items": [
        { "title": "Optimisez vos revenus", "text": "…" },
        { "title": "Gagnez du temps", "text": "…" },
        { "title": "Sérénité totale", "text": "…" },
        { "title": "Des conseils personnalisés", "text": "…" }
      ]
    },
    {
      "id": "reseau-pros",
      "type": "proNetwork",
      "title": "Un réseau de professionnels à votre service",
      "intro": "Phrase intro gestion locative ${city}",
      "services": [
        { "title": "Multidiffusion annonce", "text": "Airbnb, Booking, Abritel et plus de 15 revendeurs" },
        { "title": "Optimisation des tarifs", "text": "…" },
        { "title": "Obligations légales ${city}", "text": "déclarations, taxes de séjour, normes…" }
      ],
      "ctaText": "Trouvez un professionnel à ${city}"
    }
  ],
  "faqItems": [
    { "question": "L'estimation à ${city} est-elle vraiment gratuite ?", "answer": "…" },
    { "question": "Dois-je obligatoirement confier mon bien à une agence à ${city} ?", "answer": "…" },
    { "question": "Sur quelles données repose l'estimation à ${city} ?", "answer": "…" },
    { "question": "Combien de temps prend l'estimation ?", "answer": "…" },
    { "question": "Puis-je être accompagné après l'estimation ?", "answer": "…" },
    { "question": "L'estimation est-elle valable pour tous les types de biens à ${city} ?", "answer": "…" }
  ],
  "seo": {
    "metaTitle": "Estimation location vacances ${city} | estimate.rentals (55–60 chars)",
    "metaDescription": "Meta description 150–160 chars avec mot-clé et CTA"
  }
}`

  const client = new Anthropic()

  const message = await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 8192,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const raw = message.content[0].type === 'text' ? message.content[0].text : ''
  const jsonStr = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()

  let generated: any
  try {
    generated = JSON.parse(jsonStr)
  } catch {
    return NextResponse.json({ error: 'Réponse Claude non parseable', raw }, { status: 500 })
  }

  const payload = await getPayload({ config })

  const slug = generated.slug ?? slugify(city)
  const existing = await payload.find({ collection: 'pillar-pages', where: { slug: { equals: slug } } })
  const finalSlug = existing.totalDocs > 0 ? `${slug}-${Date.now()}` : slug

  // Build sections array for Payload — full data serialised in `text` for the renderer
  const sections = (generated.sections ?? []).map((s: any) => ({
    blockType: s.type ?? 'richText',
    title: s.title ?? '',
    text: JSON.stringify(s),
    ctaText: s.ctaText ?? '',
    ctaHref: s.ctaHref ?? '',
  }))

  const faqItems = (generated.faqItems ?? []).map((f: any) => ({
    question: f.question,
    answer: f.answer,
  }))

  const page = await payload.create({
    collection: 'pillar-pages',
    data: {
      slug: finalSlug,
      status: 'draft' as const,
      city,
      targetKeyword: keyword,
      title: generated.title ?? `Estimation location de vacances à ${city}`,
      intro: generated.hero?.intro ?? '',
      heroCtaText: generated.hero?.ctaText ?? `J'estime mes revenus à ${city}`,
      sections,
      faqItems,
      seo: {
        metaTitle: generated.seo?.metaTitle ?? '',
        metaDescription: generated.seo?.metaDescription ?? '',
      },
    } as any,
  })

    return NextResponse.json({ pageId: page.id, slug: finalSlug })
  } catch (err: any) {
    console.error('[generate-pillar-page] erreur:', err)
    return NextResponse.json(
      { error: err?.message ?? 'Erreur serveur inconnue', stack: err?.stack?.slice(0, 500) },
      { status: 500 }
    )
  }
}
