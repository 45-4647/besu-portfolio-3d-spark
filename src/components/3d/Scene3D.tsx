import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { FloatingCube } from './FloatingCube';
import { Suspense } from 'react';

export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="opacity-60"
      >
        <Suspense fallback={null}>
          {/* Ambient lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          {/* Floating cubes */}
          <FloatingCube position={[-2, 1, 0]} color="#8B5CF6" speed={0.8} />
          <FloatingCube position={[2, -1, -1]} color="#A855F7" speed={1.2} />
          <FloatingCube position={[0, 2, -2]} color="#C084FC" speed={1.0} />
          <FloatingCube position={[-3, -2, 1]} color="#DDD6FE" speed={0.6} />
          <FloatingCube position={[3, 1, 2]} color="#8B5CF6" speed={1.4} />
          
          {/* Central sphere */}
          <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial
              color="#8B5CF6"
              emissive="#8B5CF6"
              emissiveIntensity={0.2}
              transparent
              opacity={0.7}
            />
          </Sphere>
          
          {/* Interactive controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}