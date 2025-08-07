import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { NavHeader } from '@/features/nav'
import dynamic from 'next/dynamic'

const MessageProvider = dynamic(
  () =>
    import('@/components/Message').then(mod => ({
      default: mod.MessageProvider,
    })),
  { ssr: false }
)

import 'markdown-it-github-alerts/styles/github-colors-light.css'
import 'markdown-it-github-alerts/styles/github-colors-dark-class.css'
import 'markdown-it-github-alerts/styles/github-base.css'
import '@shikijs/twoslash/style-rich.css'
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
          <main className="overflow-x-hidden overflow-y-hidden px-[2.8rem] py-[4.0rem] min-h-[calc(100vh-var(--atori-nav-height)-var(--atori-footer-height))]">
            {children}
          </main>
          <footer className="p-xl text-sm opacity-60 mx-auto text-center">
            CC BY-NC-SA 4.0 2022-PRESENT © Tomos Zhao
          </footer>
        </MessageProvider>
      </body>
    </html>
  )
}
