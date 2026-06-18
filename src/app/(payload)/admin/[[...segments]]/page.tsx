import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from '../importMap.js'
import type { AdminViewProps } from 'payload'

export const dynamic = 'force-dynamic'

export { generatePageMetadata as generateMetadata }

export default function Page(args: AdminViewProps) {
  return RootPage({ ...args, config, importMap })
}
