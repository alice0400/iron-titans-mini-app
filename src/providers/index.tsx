// src/providers/index.tsx (Bypass Version)
'use client';

// เราจะนำ MiniKitProvider ออกไปทั้งหมด แล้วส่ง children ผ่านไปตรงๆ
export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // ส่งค่า children ผ่านไปเฉยๆ โดยไม่มี Provider ครอบ
}