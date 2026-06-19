import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from '../importMap'
import React from 'react'

export const dynamic = 'force-dynamic'

type Args = {
  children: React.ReactNode
}

export default async function Layout({ children }: Args) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function serverFunction(args: any) {
    'use server'
    return handleServerFunctions({ ...args, config, importMap })
  }

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
