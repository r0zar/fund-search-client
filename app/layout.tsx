import { cn } from '@/lib/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const roboto = Roboto({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700', '900'] })

export const metadata: Metadata = {
  title: 'Securities Search Engine',
  description: 'Built for Morningstar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(roboto.className, 'container', 'my-8')}>{children}</body>
      <Analytics />
    </html>
  )
}
