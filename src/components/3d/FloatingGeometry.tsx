import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Torus, Icosahedron, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  shape?: 'torus' | 'icosahedron' | 'octahedron';
  color?: string;
  speed?: number;
  distort?: number;
}

export function FloatingGeometry({ position, shape = 'icosahedron', color = '#8B5CF6', speed = 1, distort = 0.3 }: Props) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * speed * 0.3;
    ref.current.rotation.y = t * speed * 0.2;
    ref.current.position.y = position[1] + Math.sin(t * speed * 0.5) * 0.4;
  });

  const material = (
    <MeshDistortMaterial
      color={color}
      emissive={color}
      emissiveIntensity={0.15}
      transparent
      opacity={0.6}
      distort={distort}
      speed={2}
      roughness={0.1}
      metalness={0.8}
    />
  );

  return (
    <mesh ref={ref} position={position}>
      {shape === 'torus' && <Torus args={[0.6, 0.2, 16, 64]}>{material}</Torus>}
      {shape === 'icosahedron' && <Icosahedron args={[0.5, 1]}>{material}</Icosahedron>}
      {shape === 'octahedron' && <Octahedron args={[0.5]}>{material}</Octahedron>}
    </mesh>
  );
}
