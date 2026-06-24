import type { Metadata } from 'next';
import './globals.css';
import GrainOverlay from '../components/GrainOverlay';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Cinematic Portfolio',
  description: 'A premium cinematic portfolio hero with immersive motion and ambient depth.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ cursor: 'none' }}>
        <GrainOverlay />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
