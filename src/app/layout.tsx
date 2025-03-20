import '../styles/globals.css';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import Header from '@/components/Header';
import ThemeProvider from '@/components/ThemeProvider';

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '600', '800'],
  variable: '--font-nunito-sans',
});

export const metadata: Metadata = {
  title: 'REST Countries API',
  description: 'REST Countries API with color theme switcher',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunitoSans.className} min-h-screen`}>
        <ThemeProvider>
          <Header />
          <main className="container-custom py-6 md:py-12 pt-24 md:pt-28">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
