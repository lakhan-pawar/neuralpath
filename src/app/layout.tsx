import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Providers } from './providers';

const inter = Inter({ 
  variable: '--font-inter', 
  subsets: ['latin'],
  display: 'swap',
});
const jakarta = Plus_Jakarta_Sans({ 
  variable: '--font-jakarta', 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'NeuralPath | AI Engineering Career OS',
  description:
    'Transition from C# developer to AI Engineer — personalized roadmaps, live jobs, trending terminology, and AI-powered interview prep.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <Providers>
          <Navbar />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
