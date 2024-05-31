import type { Metadata } from 'next';
import { Chicle } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Telephone',
  description:
    'A game to help learn Chinese numbers by listening to a native speaker. Enjoy fun and interactive learning!',
  authors: [{ name: 'Jeremiah Clothier' }],
  robots: {
    follow: true,
    index: true
  }
};

const chicle = Chicle({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={chicle.className}>
      <body className="bg-default text-default">
        <main className="m-2 sm:m-4">{children}</main>
      </body>
    </html>
  );
}
