import { RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from '../importMap'
import React from 'react'

type Args = {
  children: React.ReactNode
}

export default function Layout({ children }: Args) {
  return RootLayout({ children, config, importMap })
}
