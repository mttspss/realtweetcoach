import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NavbarWrapper } from '@/components/NavbarWrapper';
import { Toaster } from 'sonner';
import SupabaseProvider from '@/providers/SupabaseProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Rimosso import '@/styles/colors.css';
// Rimosso import { siteConfig } from '@/constant/config';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  title: 'Tweetcoa.ch - AI-powered Twitter analytics',
  description: 'Take your Twitter presence to the next level with our AI-powered analytics platform.',
  metadataBase: new URL('https://tweetcoa.ch'),
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tweetcoa.ch',
    title: 'Tweetcoa.ch - AI-powered Twitter analytics',
    description: 'Take your Twitter presence to the next level with our AI-powered analytics platform.',
    siteName: 'Tweetcoa.ch',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tweetcoa.ch - AI-powered Twitter analytics',
    description: 'Take your Twitter presence to the next level with our AI-powered analytics platform.',
    creator: '@tweetcoach',
  },
};

export const viewport: Viewport = {
  themeColor: '#070B17',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className={inter.variable}>
      <body className="min-h-screen text-foreground font-inter antialiased overflow-x-hidden bg-black">
        {/* Background pattern grid */}
        <div className="fixed inset-0 bg-grid opacity-5 pointer-events-none"></div>
        
        {/* Suprema-style background with cyan accents */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Dark base background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050C12] to-black"></div>
          
          {/* Large glow highlight at top center - subtle but wide */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[50%] bg-gradient-radial from-[#00E7FF]/5 to-transparent opacity-50 blur-[100px]"></div>
          
          {/* Top-right small accent glow - brighter */}
          <div className="absolute top-[15%] right-[10%] w-[40%] h-[30%] bg-[#00E7FF]/10 blur-[80px] rounded-full"></div>
          
          {/* Bottom-left accent glow - bluer */}
          <div className="absolute bottom-[15%] left-[10%] w-[40%] h-[40%] bg-[#1D8BFF]/10 blur-[100px] rounded-full"></div>
          
          {/* Bottom right small accent spot */}
          <div className="absolute bottom-[20%] right-[20%] w-[15%] h-[15%] bg-[#00E7FF]/5 blur-[50px] rounded-full"></div>
          
          {/* Top left small accent spot */}
          <div className="absolute top-[20%] left-[15%] w-[10%] h-[10%] bg-[#00E7FF]/5 blur-[40px] rounded-full"></div>
          
          {/* Subtle vignette effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-20"></div>
        </div>
        
        <SupabaseProvider>
          <div className="relative z-10">
            <NavbarWrapper />
            <main>
              {children}
            </main>
          </div>
        </SupabaseProvider>
        
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
