import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getPayload } from 'payload'
import config from '@payload-config'

export const maxDuration = 300

// ── Lexical helpers ────────────────────────────────────────────────────────

function mkText(text: string, bold = false) {
  return { type: 'text', text, format: bold ? 1 : 0, style: '', mode: 'normal', detail: 0, version: 1 }
}
function mkParagraph(text: string) {
  return { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0, textStyle: '', children: [mkText(text)] }
}
function mkH3(text: string) {
  return { type: 'heading', tag: 'h3', format: '', indent: 0, version: 1, direction: 'ltr', children: [mkText(text)] }
}
function mkBullets(items: string[]) {
  return {
    type: 'list', listType: 'bullet', start: 1, tag: 'ul',
    format: '', indent: 0, version: 1, direction: 'ltr',
    children: items.map((item, i) => ({
      type: 'listitem', value: i + 1, indent: 0, format: '', version: 1, direction: 'ltr',
      children: [mkText(item)],
    })),
  }
}
function lexicalDoc(children: unknown[]) {
  return { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children } }
}
function sectionToLexical(s: {
  paragraphs?: string[]
  bullets?: string[]
  subSections?: { heading: string; paragraphs?: string[]; bullets?: string[] }[]
}) {
  const nodes: unknown[] = []
  for (const p of s.paragraphs ?? []) nodes.push(mkParagraph(p))
  if (s.bullets?.length) nodes.push(mkBullets(s.bullets))
  for (const sub of s.subSections ?? []) {
    nodes.push(mkH3(sub.heading))
    for (const p of sub.paragraphs ?? []) nodes.push(mkParagraph(p))
    if (sub.bullets?.length) nodes.push(mkBullets(sub.bullets))
  }
  if (nodes.length === 0) nodes.push(mkParagraph(''))
  return lexicalDoc(nodes)
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

// ── Route ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY non configurée.' }, { status: 500 })
  }

  const body = await req.json()
  const { topic, keywords, authorId, locale = 'fr' } = body as {
    topic: string
    keywords?: string
    authorId?: string
    locale?: string
  }

  if (!topic) return NextResponse.json({ error: 'topic requis' }, { status: 400 })

  const payload = await getPayload({ config })

  // ── Fetch author profile for EEAT ──────────────────────────────────────
  let authorContext = ''
  let resolvedAuthorId: number | undefined
  if (authorId) {
    try {
      const author = await payload.findByID({ collection: 'authors', id: authorId })
      resolvedAuthorId = author.id as number
      authorContext = `
NOM: ${author.name}
RÔLE: ${(author as any).role ?? ''}
EXPERTISE: ${(author as any).expertise ?? ''}
BIO: ${(author as any).bio ?? ''}
TON DE RÉDACTION: ${(author as any).writingTone ?? ''}
RÉFÉRENCES: ${(author as any).credentials ?? ''}
LINKEDIN: ${(author as any).linkedinUrl ?? ''}`.trim()
    } catch {
      // author not found — continue without
    }
  }

  // ── Internal pages for maillage interne ──────────────────────────────
  const [{ docs: pages }, { docs: posts }] = await Promise.all([
    payload.find({ collection: 'pages', limit: 20 }),
    payload.find({ collection: 'posts', limit: 10, where: { status: { equals: 'published' } } }),
  ])

  const internalLinks = [
    ...pages.map((p: any) => `/${p.slug} (${p.title ?? p.slug})`),
    ...posts.map((p: any) => `/actualites/${p.slug} (${p.title ?? p.slug})`),
  ].join('\n')

  // ── Build prompt ───────────────────────────────────────────────────────
  const systemPrompt = `Tu es un expert en rédaction SEO pour le marché de la location saisonnière professionnelle en France.
Tu rédiges des articles qui passent les filtres spam de Google, respectent les critères E-E-A-T, et apportent une valeur réelle aux professionnels (agences, gestionnaires de biens).

AUTEUR QUI SIGNE L'ARTICLE :
${authorContext || 'Auteur générique Estimate Rentals'}

RÈGLES ABSOLUES :
1. Contenu UNIQUE : ne jamais plagier, toujours un angle nouveau ou une expérience terrain
2. Valeur d'abord : chaque section apporte un conseil actionnable ou une donnée concrète
3. Langage naturel : éviter les tournures répétitives, le remplissage, le keyword stuffing
4. EEAT : intégrer des expériences concrètes, des chiffres sourcés, des exemples réels
5. Maillage interne obligatoire : mentionner et lier naturellement au moins 2-3 pages parmi :
${internalLinks}
6. Structure SEO : H1 (title), H2 par section, H3 pour sous-sections, listes pour les énumérations
7. Longueur : 1 200 à 2 000 mots minimum (contenu substantiel)

RÉPONDS UNIQUEMENT EN JSON STRICT — pas de markdown, pas de commentaires, juste le JSON.`

  const userPrompt = `Sujet : ${topic}
Mots clés cibles : ${keywords ?? topic}
Locale : ${locale}

Génère un article complet en JSON avec cette structure exacte :
{
  "title": "Titre H1 optimisé SEO (55-65 caractères, mot clé principal au début)",
  "slug": "slug-url-court-avec-mot-cle",
  "intro": "Introduction de 4-5 phrases : accroche avec chiffre ou fait, problème du lecteur, promesse de l'article. Max 400 caractères.",
  "sections": [
    {
      "heading": "Titre H2 de la section (mot clé secondaire inclus)",
      "anchor": "anchor-id-court",
      "paragraphs": ["Paragraphe 1", "Paragraphe 2"],
      "bullets": ["Point liste 1", "Point liste 2"],
      "subSections": [
        {
          "heading": "Sous-section H3",
          "paragraphs": ["Texte de la sous-section"],
          "bullets": []
        }
      ]
    }
  ],
  "summary": [
    "Point clé 1 (conseil actionnable)",
    "Point clé 2",
    "Point clé 3",
    "Point clé 4",
    "Point clé 5"
  ],
  "seoMetaTitle": "Titre SEO (55-60 chars avec mot clé)",
  "seoMetaDescription": "Meta description 150-160 chars : bénéfice + call to action"
}

Minimum 4 sections. Au moins 2 maillons internes. Contenu substantiel, pas de remplissage.`

  // ── Call Claude ────────────────────────────────────────────────────────
  const client = new Anthropic()
  let generated: any

  const message = await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 8192,
    temperature: 0.7,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const raw = message.content[0].type === 'text' ? message.content[0].text : ''

  // Strip any accidental markdown code block
  const jsonStr = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()

  try {
    generated = JSON.parse(jsonStr)
  } catch {
    return NextResponse.json({ error: 'Réponse Claude non parseable', raw }, { status: 500 })
  }

  // ── Convert to Payload data ────────────────────────────────────────────
  const sections = (generated.sections ?? []).map((s: any) => ({
    heading: s.heading,
    anchor: s.anchor ?? slugify(s.heading),
    content: sectionToLexical(s),
  }))

  const slug = generated.slug ?? slugify(generated.title ?? topic)

  // Ensure slug is unique by appending timestamp if needed
  const existing = await payload.find({ collection: 'posts', where: { slug: { equals: slug } } })
  const finalSlug = existing.totalDocs > 0 ? `${slug}-${Date.now()}` : slug

  // ── Create post ────────────────────────────────────────────────────────
  const post = await payload.create({
    collection: 'posts',
    locale: locale as 'fr' | 'en' | 'es',
    data: {
      slug: finalSlug,
      status: 'draft' as const,
      ...(resolvedAuthorId ? { author: resolvedAuthorId } : {}),
      title: generated.title ?? topic,
      intro: generated.intro ?? '',
      sections,
      summary: (generated.summary ?? []).map((text: string) => ({ text })),
      cta: { text: 'Essai gratuit', href: '/estimez-gratuitement' },
      seo: {
        metaTitle: generated.seoMetaTitle ?? generated.title ?? topic,
        metaDescription: generated.seoMetaDescription ?? '',
      },
    } as any,
  })

  return NextResponse.json({ postId: post.id, slug: finalSlug })
}
