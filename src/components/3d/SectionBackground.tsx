import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ParticleField } from './ParticleField';
import { FloatingGeometry } from './FloatingGeometry';

interface SectionBackgroundProps {
  variant?: 'about' | 'projects' | 'experience' | 'contact';
}

const configs = {
  about: {
    particles: { count: 80, color: '#8B5CF6', spread: 12, speed: 0.2 },
    shapes: [
      { position: [-5, 2, -3] as [number,number,number], shape: 'icosahedron' as const, color: '#8B5CF6', speed: 0.5, distort: 0.3 },
      { position: [5, -2, -4] as [number,number,number], shape: 'torus' as const, color: '#A855F7', speed: 0.4, distort: 0.2 },
    ],
  },
  projects: {
    particles: { count: 100, color: '#7C3AED', spread: 14, speed: 0.25 },
    shapes: [
      { position: [-6, 3, -4] as [number,number,number], shape: 'octahedron' as const, color: '#7C3AED', speed: 0.6, distort: 0.4 },
      { position: [6, -3, -5] as [number,number,number], shape: 'icosahedron' as const, color: '#C084FC', speed: 0.5, distort: 0.3 },
      { position: [0, 4, -6] as [number,number,number], shape: 'torus' as const, color: '#8B5CF6', speed: 0.3, distort: 0.2 },
    ],
  },
  experience: {
    particles: { count: 70, color: '#A855F7', spread: 12, speed: 0.2 },
    shapes: [
      { position: [5, 2, -3] as [number,number,number], shape: 'torus' as const, color: '#A855F7', speed: 0.5, distort: 0.25 },
      { position: [-5, -2, -4] as [number,number,number], shape: 'icosahedron' as const, color: '#8B5CF6', speed: 0.4, distort: 0.35 },
    ],
  },
  contact: {
    particles: { count: 90, color: '#C084FC', spread: 13, speed: 0.3 },
    shapes: [
      { position: [-5, 3, -4] as [number,number,number], shape: 'icosahedron' as const, color: '#C084FC', speed: 0.6, distort: 0.4 },
      { position: [5, -3, -5] as [number,number,number], shape: 'octahedron' as const, color: '#8B5CF6', speed: 0.5, distort: 0.3 },
    ],
  },
};

export function SectionBackground({ variant = 'about' }: SectionBackgroundProps) {
  const cfg = configs[variant];
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#8B5CF6" />
          <ParticleField {...cfg.particles} />
          {cfg.shapes.map((s, i) => (
            <FloatingGeometry key={i} {...s} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
