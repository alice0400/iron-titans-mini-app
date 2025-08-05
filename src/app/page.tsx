// src/app/page.tsx (The new Login Page)
'use client';

import { MiniKit } from '@worldcoin/minikit-js';
import { useRouter } from 'next/navigation'; // 1. นำเข้า useRouter

export default function LoginPage() {
  const router = useRouter(); // 2. สร้าง instance ของ router

  // 3. อัปเกรดฟังก์ชัน handleLogin
  const handleLogin = async () => {
    if (!MiniKit.isInstalled()) {
      console.log("Please open this in World App");
      alert("This app is designed to run inside the World App.");
      return;
    }

    try {
      console.log("Opening World ID verification...");
      const result = await MiniKit.commandsAsync.verify({
        action: 'login', // <-- Action ID ที่คุณสร้างใน Developer Portal
        signal: 'user-login-signal', // Optional: for advanced anti-fraud
      });

      if (result) {
        console.log("Verification successful!", result);
        // 4. ถ้าสำเร็จ ให้พาไปที่หน้าโรงเก็บยาน
        router.push('/hangar');
      }
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Verification failed. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="text-center p-8 border-4 border-gray-700 rounded-lg bg-gray-800 shadow-lg">
        <h1 className="text-5xl font-bold text-red-500 mb-4 tracking-wider">
          PROJECT: IRON TITANS
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Verify your World ID to access the Hangar.
        </p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300 ease-in-out"
        >
          Login with World ID
        </button>
      </div>
    </main>
  );
}