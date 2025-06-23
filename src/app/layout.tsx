import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Inter, Space_Grotesk as SpaceGrotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'YtMp3 - Fast YouTube to MP3 Converter & Downloader',
  description: 'Quickly convert and download YouTube videos to high-quality MP3 files for free with YtMp3. Our fast, reliable, and user-friendly converter works on any device without registration.',
  keywords: ['YouTube to MP3', 'YtMp3', 'YouTube converter', 'MP3 downloader', 'video to audio', 'free converter'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-screen flex-col font-body antialiased">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
