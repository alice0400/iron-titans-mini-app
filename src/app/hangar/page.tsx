// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface Inventory {
  chassis: string[];
  mainGuns: string[];
  Turrets: string[];
}

// 1. เพิ่ม equippedTitan เข้าไปในโครงสร้างข้อมูล
interface PlayerData {
  username: string;
  level: number;
  Inventory: Inventory;
  equippedTitan: TitanConfig; 
}

interface TitanConfig {
  chassis: string;
  turret: string;
  mainGun: string;
}

export default function HangarPage() {
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [currentTitan, setCurrentTitan] = useState<TitanConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const PLAYER_ID = "player-001";

  useEffect(() => {
    const fetchPlayerData = async () => {
      setIsLoading(true);
      const playerDocRef = doc(db, "players", PLAYER_ID);
      const docSnap = await getDoc(playerDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as PlayerData;
        setPlayer(data);
        // 2. ดึงค่ารถถังที่เคยบันทึกไว้มาเป็นค่าเริ่มต้น
        setCurrentTitan(data.equippedTitan); 
      } else {
        console.log("No such player!");
      }
      setIsLoading(false);
    };

    fetchPlayerData();
  }, []);

  // 3. อัปเกรดฟังก์ชันเปลี่ยนชิ้นส่วนให้บันทึกได้
  const handlePartChange = async (partType: keyof TitanConfig, newPart: string) => {
    if (currentTitan && player) {
      const newTitanConfig = { ...currentTitan, [partType]: newPart };
      // อัปเดตหน้าจอทันที
      setCurrentTitan(newTitanConfig); 

      // บันทึกกลับไปที่ Firestore
      const playerDocRef = doc(db, "players", PLAYER_ID);
      await updateDoc(playerDocRef, {
        equippedTitan: newTitanConfig
      });
      console.log("Titan configuration saved!");
    }
  };

  if (isLoading) { return <p>Loading Hangar...</p>; }
  if (!player || !currentTitan) { return <p>Failed to load player data.</p>; }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-red-500 mb-2 tracking-wider">
        {player.username}'s Hangar
      </h1>
      <p className="text-lg text-gray-400 mb-8">Level {player.level}</p>

      <section className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg border-2 border-gray-700 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-yellow-400">Current Configuration</h2>
        <div className="space-y-3 text-lg">
          <p><span className="font-bold text-gray-400">Chassis:</span> {currentTitan.chassis}</p>
          <p><span className="font-bold text-gray-400">Turret:</span> {currentTitan.turret}</p>
          <p><span className="font-bold text-gray-400">Main Gun:</span> {currentTitan.mainGun}</p>
        </div>
      </section>

      <section className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg border-2 border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-400">Inventory</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Chassis</h3>
          <div className="flex flex-wrap gap-2">
            {player.Inventory.chassis.map((part, index) => (
              <button key={`${part}-${index}`} onClick={() => handlePartChange('chassis', part)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {part}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Turrets</h3>
          <div className="flex flex-wrap gap-2">
            {player.Inventory.Turrets.map((part, index) => (
              <button key={`${part}-${index}`} onClick={() => handlePartChange('turret', part)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {part}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Main Guns</h3>
          <div className="flex flex-wrap gap-2">
            {player.Inventory.mainGuns.map((part, index) => (
              <button key={`${part}-${index}`} onClick={() => handlePartChange('mainGun', part)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {part}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}