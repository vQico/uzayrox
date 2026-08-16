'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Line, Edges, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '@/context/LanguageContext';

function CoreStructure() {
  const meshRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Group>(null);
  const { t } = useLanguage();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.1;
      outerRingRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      outerRingRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.5;
      innerRingRef.current.rotation.y -= delta * 0.4;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * 3, Math.sin(angle) * 3, 0));
    }
    return pts;
  }, []);

  const innerPoints = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0));
    }
    return pts;
  }, []);

  return (
    <group>
      {/* Central Server Cube / Abstract Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial 
            color="#0a0a0a" 
            metalness={0.9} 
            roughness={0.1}
            wireframe={false}
          />
          <Edges 
            linewidth={2} 
            scale={1.05} 
            threshold={15} 
            color="white" 
          />
        </mesh>
      </Float>

      {/* Holographic Rings */}
      <group ref={outerRingRef}>
        <Line points={points} color="white" lineWidth={1} transparent opacity={0.3} />
        <Text 
          position={[3, 0, 0]} 
          fontSize={0.1} 
          color="white" 
          anchorX="left" 
          anchorY="middle"
          rotation={[0, 0, -Math.PI / 2]}
        >
          {t.hero.coreStatus}
        </Text>
      </group>

      <group ref={innerRingRef}>
        <Line points={innerPoints} color="#888888" lineWidth={0.5} transparent opacity={0.5} />
      </group>

      {/* Particles around the core */}
      <Particles count={100} />
    </group>
  );
}

function Particles({ count }: { count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -10 + Math.random() * 20;
      const yFactor = -10 + Math.random() * 20;
      const zFactor = -10 + Math.random() * 20;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (mesh.current) {
      particles.forEach((particle, i) => {
        let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
        t = particle.t += speed / 2;
        const a = Math.cos(t) + Math.sin(t * 1) / 10;
        const b = Math.sin(t) + Math.cos(t * 2) / 10;
        const s = Math.cos(t);
        dummy.position.set(
          (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
          (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
          (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
        );
        dummy.scale.set(s, s, s);
        dummy.rotation.set(s * 5, s * 5, s * 5);
        dummy.updateMatrix();
        mesh.current!.setMatrixAt(i, dummy.matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.02, 0.02, 0.02]} />
      <meshBasicMaterial color="white" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function DigitalCore3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="white" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#888888" />
        <CoreStructure />
      </Canvas>
    </div>
  );
}
