import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from '../importMap'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

export async function generateMetadata({ params, searchParams }: Args) {
  return generatePageMetadata({ config, params, searchParams })
}

export default async function Page({ params, searchParams }: Args) {
  return RootPage({ config, importMap, params, searchParams })
}
