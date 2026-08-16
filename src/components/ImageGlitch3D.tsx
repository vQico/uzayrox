'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// Custom WebGL Shader for Image Glitch & RGB Shift
// --------------------------------------------------------
const GlitchMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // Random noise function
    float rand(vec2 co) {
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      
      // Normalize mouse to -1.0 to 1.0
      vec2 normMouse = (uMouse * 2.0) - 1.0;
      
      // Calculate distance from current pixel to mouse
      // For fragment shaders, gl_FragCoord is in pixels. Let's use UV space.
      vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
      float dist = distance(uv * aspect, uMouse * aspect);

      // RGB Shift strength based on time and mouse interaction
      float shiftStrength = 0.005 + (0.01 * sin(uTime * 2.0));
      // Intensify near the mouse
      shiftStrength += smoothstep(0.5, 0.0, dist) * 0.02;

      // Displacement direction
      vec2 dir = normalize(uv - 0.5);
      
      // Sample RGB channels with slight offsets
      float r = texture2D(uTexture, uv + dir * shiftStrength).r;
      float g = texture2D(uTexture, uv).g;
      float b = texture2D(uTexture, uv - dir * shiftStrength).b;
      
      vec4 color = vec4(r, g, b, 1.0);

      // Add vignette
      float vignette = smoothstep(1.5, 0.2, length(uv - 0.5));
      color.rgb *= vignette;

      // Add film grain
      float noise = rand(uv * uTime) * 0.08;
      color.rgb -= noise;

      gl_FragColor = color;
    }
  `
);

// Register the custom material so R3F can use it as <glitchMaterial />
import { extend } from '@react-three/fiber';
extend({ GlitchMaterial });

type GlitchMaterialImpl = {
  uTime: number;
  uMouse: THREE.Vector2;
  uResolution: THREE.Vector2;
  uTexture: THREE.Texture;
} & any;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      glitchMaterial: GlitchMaterialImpl;
    }
  }
}

// --------------------------------------------------------
// Mesh Component
// --------------------------------------------------------
function ImageMesh({ imgUrl }: { imgUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  
  // Load texture (use a default placeholder if none provided)
  // Disable color space sRGB conversion issues manually if needed, but useTexture handles it usually.
  const texture = useTexture(imgUrl);
  
  const { viewport, size } = useThree();

  // Scale the plane to cover the screen while maintaining aspect ratio
  // Assuming a 16:9 general image ratio, but let's fit it.
  const scale = useMemo(() => {
    const img = texture.image as any;
    const imageAspect = img.width / img.height;
    const viewportAspect = viewport.width / viewport.height;
    
    let scaleX = viewport.width;
    let scaleY = viewport.height;
    
    if (viewportAspect > imageAspect) {
      scaleY = viewport.width / imageAspect;
    } else {
      scaleX = viewport.height * imageAspect;
    }
    
    return [scaleX, scaleY, 1] as [number, number, number];
  }, [texture, viewport]);

  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((state, delta) => {
    // Smooth mouse interpolation
    // state.mouse is -1 to 1, we want 0 to 1 for UV mapping in shader
    targetMouse.current.x = (state.mouse.x + 1) / 2;
    targetMouse.current.y = (state.mouse.y + 1) / 2;
    
    mouse.current.lerp(targetMouse.current, 0.1);

    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uMouse = mouse.current;
      materialRef.current.uResolution = new THREE.Vector2(size.width, size.height);
    }

    // Physical Parallax (tilt the plane slightly)
    if (meshRef.current) {
      const tiltX = (mouse.current.y - 0.5) * 0.2; // up/down
      const tiltY = (mouse.current.x - 0.5) * -0.2; // left/right
      meshRef.current.rotation.x += (tiltX - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.y += (tiltY - meshRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-ignore */}
      <glitchMaterial 
        ref={materialRef} 
        uTexture={texture}
        transparent={true}
      />
    </mesh>
  );
}

// --------------------------------------------------------
// Main Exported Component
// --------------------------------------------------------
export default function ImageGlitch3D({ imageUrl = '/hero-bg.jpg' }: { imageUrl?: string }) {
  return (
    <div className="w-full h-full absolute inset-0 z-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ImageMesh imgUrl={imageUrl} />
        </Suspense>
      </Canvas>
      {/* Fallback gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
    </div>
  );
}
