// src/app/layout.tsx (Simplified Version)
import ClientProviders from '@/providers';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Project: Iron Titans',
  description: 'The Hangar is ready for deployment.',
};

// ทำให้เป็น component ธรรมดา ไม่ต้องใช้ async หรือ auth() ชั่วคราว
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* ไม่ต้องส่ง session prop ไปแล้ว */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}