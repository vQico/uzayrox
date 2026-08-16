'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function SlitheringSnake() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // Calculate global scroll progress (0 to 1)
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight || 1;
    const scrollProgress = scrollY / maxScroll;
    
    // Add an extra rotation factor based heavily on scroll
    const scrollRotationX = scrollProgress * Math.PI * 4; // 2 full rotations
    const scrollRotationY = scrollProgress * Math.PI * -2; // 1 full reverse rotation

    if (meshRef.current) {
      // Time-based slithering + Scroll-based dynamic rotation
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z -= delta * 0.05;
      
      // Move snake downwards linearly as the user scrolls down (from top +4 to bottom -4)
      meshRef.current.position.y = 4 - (scrollProgress * 8); 
      
      meshRef.current.rotation.x = scrollRotationX + (state.clock.elapsedTime * 0.1);
      meshRef.current.rotation.z = scrollRotationY;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      {/* Outer Wireframe Snake - Made massive to cover the entire background */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[12, 0.4, 400, 50, 4, 9]} />
        <meshBasicMaterial 
          color="#00ff00" 
          wireframe={true} 
          transparent={true} 
          opacity={0.3} 
        />
      </mesh>
    </Float>
  );
}

export default function Snake3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <SlitheringSnake />
      </Canvas>
    </div>
  );
}
