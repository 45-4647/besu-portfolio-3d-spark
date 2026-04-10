import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense } from 'react';
import { MeshDistortMaterial, Torus, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

function DNAHelix() {
  const group = useRef<THREE.Group>(null);
  const count = 30;

  const points = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const t = (i / count) * Math.PI * 4;
      return {
        a: new THREE.Vector3(Math.cos(t) * 1.2, (i / count) * 6 - 3, Math.sin(t) * 1.2),
        b: new THREE.Vector3(Math.cos(t + Math.PI) * 1.2, (i / count) * 6 - 3, Math.sin(t + Math.PI) * 1.2),
      };
    });
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={group} position={[3.5, 0, -2]}>
      {points.map((p, i) => (
        <group key={i}>
          <mesh position={p.a}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={p.b}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#C084FC" emissive="#C084FC" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function PulsingRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * speed) * 0.15;
      ref.current.scale.set(s, s, s);
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
      ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });
  return (
    <Torus ref={ref} args={[radius, 0.03, 8, 80]} position={[-3, 0, -3]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.5} />
    </Torus>
  );
}

function FloatingSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });
  return (
    <Sphere ref={ref} args={[0.8, 64, 64]} position={[-3.5, 0, -2]}>
      <MeshDistortMaterial
        color="#7C3AED"
        emissive="#7C3AED"
        emissiveIntensity={0.2}
        distort={0.5}
        speed={3}
        transparent
        opacity={0.5}
        roughness={0}
        metalness={0.8}
      />
    </Sphere>
  );
}

function ParticleRing() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 2.5 + (Math.random() - 0.5) * 0.8;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <points ref={ref} position={[0, 0, -4]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#A855F7" size={0.05} transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

export function ContactScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 65 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#8B5CF6" />
          <pointLight position={[-5, -5, 3]} intensity={1.5} color="#C084FC" />
          <pointLight position={[0, 0, 6]} intensity={1} color="#7C3AED" />

          <Stars radius={60} depth={40} count={2000} factor={2} fade speed={0.5} />
          <ParticleRing />
          <FloatingSphere />
          <PulsingRing radius={1.8} speed={1.2} color="#8B5CF6" />
          <PulsingRing radius={2.4} speed={0.8} color="#A855F7" />
          <PulsingRing radius={3.0} speed={0.5} color="#C084FC" />
          <DNAHelix />
        </Suspense>
      </Canvas>
    </div>
  );
}
