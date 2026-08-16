'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function ParticleGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow elegant rotation of the entire particle field
      groupRef.current.rotation.y += delta * 0.02;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Deep red cinematic dust */}
      <Sparkles 
        count={3000} 
        scale={25} 
        size={2} 
        speed={0.2} 
        opacity={0.4} 
        color="#ff0000" 
        noise={0.1}
      />
      
      {/* Subtle white stars/dust for depth */}
      <Sparkles 
        count={1500} 
        scale={20} 
        size={1.5} 
        speed={0.1} 
        opacity={0.3} 
        color="#ffffff" 
        noise={0.2}
      />
    </group>
  );
}

export default function GlobalParticles() {
  return (
    <div className="fixed inset-0 z-[-2] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <fog attach="fog" args={['#000000', 5, 20]} />
        <ambientLight intensity={0.5} />
        <ParticleGroup />
      </Canvas>
    </div>
  );
}
