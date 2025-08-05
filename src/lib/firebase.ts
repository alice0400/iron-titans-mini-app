// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// วาง firebaseConfig ที่คุณคัดลอกมาตรงนี้
const firebaseConfig = {
  apiKey: "AIzaSyDPekCZVaP_WuqNGo3HzC1tSS-o4O9Pehs",
  authDomain: "iron-titans.firebaseapp.com",
  projectId: "iron-titans",
  storageBucket: "iron-titans.firebasestorage.app",
  messagingSenderId: "229955638444",
  appId: "1:229955638444:web:b3a56f95958bb26be33b09",
  measurementId: "G-RT0Z1DJ6SQ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get Firestore instance
const db = getFirestore(app);

export { db };