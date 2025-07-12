import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { NavHeader } from '@/features/nav'
import { MessageProvider } from '@/components/Message'

import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Tomos Zhao',
  description: 'personal site',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MessageProvider>
          <NavHeader />
          <main className="p-xl overflow-x-hidden overflow-y-hidden">
            {children}
          </main>
        </MessageProvider>
      </body>
    </html>
  )
}
