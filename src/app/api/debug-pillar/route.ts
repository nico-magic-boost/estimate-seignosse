import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') ?? 'biarritz'
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pillar-pages',
      where: { slug: { equals: slug } } as any,
      limit: 1,
    })
    return NextResponse.json({
      totalDocs: result.totalDocs,
      found: result.docs.length > 0,
      slug: result.docs[0]?.slug,
      status: (result.docs[0] as any)?.status,
      id: result.docs[0]?.id,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message, stack: err?.stack?.slice(0, 500) }, { status: 500 })
  }
}
