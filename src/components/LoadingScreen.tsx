'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// The 3D Core Component
function LoadingCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.2;
      coreRef.current.rotation.y += delta * 0.3;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x -= delta * 0.5;
      ringRef1.current.rotation.y -= delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <group scale={1}>
        {/* Inner Core */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#00ff00" wireframe transparent opacity={0.3} />
        </mesh>
        
        {/* Outer Ring 1 (Green) */}
        <mesh ref={ringRef1}>
          <torusGeometry args={[2, 0.05, 16, 100]} />
          <meshBasicMaterial color="#00ff00" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0); // 0: init, 1: loading, 2: complete, 3: exit
  const [loadingBar, setLoadingBar] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    // Stage 1: Initial delay before starting progress
    const initTimer = setTimeout(() => {
      setStage(1);
    }, 400);

    return () => clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    if (stage === 1) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + Math.floor(Math.random() * 15) + 5;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage(2), 500); // Small pause at 100%
            return 100;
          }
          return next;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [stage]);

  useEffect(() => {
    // Generate the block characters based on progress
    const blocks = Math.floor(progress / 5);
    setLoadingBar('█'.repeat(blocks) + ' '.repeat(20 - blocks));
  }, [progress]);

  useEffect(() => {
    if (stage === 2) {
      const exitTimer = setTimeout(() => {
        setStage(3);
      }, 1200); // Time to show SYSTEM ONLINE and let the prism spin
      return () => clearTimeout(exitTimer);
    }
  }, [stage]);

  if (stage === 3) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        exit={{ 
          opacity: 0, 
          scale: 1.1,
          filter: 'blur(10px)',
          transition: { duration: 0.8, ease: "easeInOut" } 
        }}
      >
        <div className="absolute inset-0 z-0 opacity-50">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <LoadingCore />
          </Canvas>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center font-mono text-white max-w-md w-full px-6 mt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-3xl font-black tracking-[0.3em] text-white"
          >
            UZAYROX
          </motion.div>
          
          <div className="w-full text-sm text-subtle-gray space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: stage >= 1 ? 1 : 0 }}
              className="text-center tracking-widest uppercase text-[10px] text-white/50"
            >
              {t.loading.initializing}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: stage >= 1 ? 1 : 0 }}
              className="flex justify-between font-mono items-center"
            >
              <span className="text-green-500 whitespace-pre text-xs">{loadingBar}</span>
              <span className="text-white text-xs">{progress}%</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: stage >= 2 ? 1 : 0 }}
              className="text-green-500 font-bold tracking-[0.2em] mt-4 text-center text-xs"
            >
              {t.loading.online}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
