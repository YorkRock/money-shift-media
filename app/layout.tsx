
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/toaster'
import SessionProviderWrapper from '@/components/session-provider-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SHIFT - ビジネス、テクノロジー、マネー、ライフの最新情報',
  description: 'ビジネス、テクノロジー、マネー、ライフスタイルの最新ニュースと分析をお届けします。投資シミュレーターやメルマガ配信も提供。',
  keywords: 'ビジネス, テクノロジー, マネー, ライフスタイル, ニュース, 投資, 資産形成, シミュレーター',
  metadataBase: new URL('https://money-shift.jp'),
  openGraph: {
    title: 'SHIFT - ビジネス、テクノロジー、マネー、ライフの最新情報',
    description: 'ビジネス、テクノロジー、マネー、ライフスタイルの最新ニュースと分析をお届けします。',
    url: 'https://money-shift.jp',
    siteName: 'SHIFT',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SHIFT - ビジネス、テクノロジー、マネー、ライフの最新情報',
    description: 'ビジネス、テクノロジー、マネー、ライフスタイルの最新ニュースと分析をお届けします。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-white`}>
        <SessionProviderWrapper>
          <Header />
          <main className="min-h-screen pt-16 bg-white">
            {children}
          </main>
          <Footer />
          <Toaster />
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
