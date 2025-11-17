import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '700', '800'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['900'],
})

export const metadata: Metadata = {
  title: 'CoffeeTrack - Premium Coffee Price Tracker',
  description: 'Find premium coffee at the best prices. AI-powered platform to track prices and discover the best deals on specialty coffee beans.',
  keywords: 'coffee, price tracker, coffee deals, specialty coffee, coffee roasters',
  authors: [{ name: 'CoffeeTrack' }],
  openGraph: {
    title: 'CoffeeTrack - Premium Coffee Price Tracker',
    description: 'Find premium coffee at the best prices.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${playfair.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-display antialiased">{children}</body>
    </html>
  )
}
