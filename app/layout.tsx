import './globals.css';
import type { Metadata } from 'next';
import { Mukta } from 'next/font/google';

const mukta = Mukta({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Black-Scholes-Merton Calculator',
  description: 'A calculator for European options pricing using the Black-Scholes-Merton model',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mukta.className}>
      <body>
        <nav className="bg-white/70 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-16">
              <h1 className="text-xl font-semibold text-gray-800">
                Black Scholes Merton Calculator
              </h1>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
} 