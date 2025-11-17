import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Coffee Price Tracker | Find the Best Coffee Deals',
  description: 'AI-powered coffee price comparison from 50+ premium roasters. Find the best quality coffee at the best prices.',
  keywords: 'coffee, price tracker, coffee deals, specialty coffee, coffee roasters',
  authors: [{ name: 'Coffee Price Tracker' }],
  openGraph: {
    title: 'Coffee Price Tracker | Find the Best Coffee Deals',
    description: 'AI-powered coffee price comparison from 50+ premium roasters.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
