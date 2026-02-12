import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NileQuest Egypt Explorer',
  description: 'Interactive 3D educational journey across Egypt for kids'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
