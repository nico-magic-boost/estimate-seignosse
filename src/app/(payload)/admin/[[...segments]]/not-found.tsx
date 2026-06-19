import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<Record<string, string | string[]>>
}

export async function generateMetadata({ params, searchParams }: Args) {
  return generatePageMetadata({ config, params, searchParams })
}

export default function NotFound({ params, searchParams }: Args) {
  return NotFoundPage({ config, importMap, params, searchParams })
}
