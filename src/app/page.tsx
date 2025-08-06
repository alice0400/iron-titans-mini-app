// src/app/page.tsx (The Final Login Page)
'use client';

import { MiniKit } from '@worldcoin/minikit-js';
// เราไม่ต้องการ useRouter แล้ว เลยลบทิ้งไป
// import { useRouter } from 'next/navigation'; 

export default function LoginPage() {
  // const router = useRouter(); // ไม่ต้องใช้แล้ว

  const handleLogin = async () => {
    if (!MiniKit.isInstalled()) {
      console.log("Please open this in World App");
      alert("This app is designed to run inside the World App.");
      return;
    }

    try {
      console.log("Opening World ID verification...");
      const result = await MiniKit.commandsAsync.verify({
        action: 'login',
        signal: 'user-login-signal',
      });

      if (result) {
        console.log("Verification successful!", result);

        // [แก้ไข] เปลี่ยนมาใช้ window.location.href แทน
        window.location.href = '/hangar'; 
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
