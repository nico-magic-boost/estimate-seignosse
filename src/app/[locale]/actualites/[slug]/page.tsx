import { notFound } from 'next/navigation'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!slug) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Article</h1>
      <p className="text-gray-500">Contenu de l&apos;article à venir.</p>
    </div>
  )
}
