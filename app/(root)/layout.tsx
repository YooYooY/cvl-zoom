import StreamVideoProvider from '@/provoders/StreamClientProvider'
import { Metadata } from 'next'
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'cvl-zoom',
  description: 'Video calling app',
  icons: {
    icon: '/icons/zoom-logo.svg',
  },
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  )
}

export default RootLayout
