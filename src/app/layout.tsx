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

const geisHandCh = localFont({
  src: './fonts/ZhiMangXing-Regular.ttf',
  variable: '--font-geist-hand-ch',
  weight: '400',
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
      <head>
        <script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          async
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.OneSignalDeferred = window.OneSignalDeferred || [];
              OneSignalDeferred.push(async function(OneSignal) {
                await OneSignal.init({
                  appId: "${process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID}",
                });
              });
          `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geisHandCh.variable} antialiased`}
      >
        <MessageProvider>
          <NavHeader />
          <main className="overflow-x-hidden px-[2.8rem] py-[4.0rem] min-h-[calc(100vh-var(--atori-nav-height)-var(--atori-footer-height))]">
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
