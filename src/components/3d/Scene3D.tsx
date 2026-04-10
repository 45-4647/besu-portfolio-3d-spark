import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import { FloatingCube } from './FloatingCube';
import { ParticleField } from './ParticleField';
import { FloatingGeometry } from './FloatingGeometry';

export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 70 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#8B5CF6" />
          <pointLight position={[-10, -10, -5]} intensity={0.8} color="#A855F7" />

          <Stars radius={80} depth={50} count={3000} factor={3} fade speed={1} />
          <ParticleField count={150} color="#8B5CF6" spread={10} speed={0.4} />

          <FloatingGeometry position={[-3, 1.5, -1]} shape="icosahedron" color="#8B5CF6" speed={0.7} distort={0.4} />
          <FloatingGeometry position={[3, -1, -2]} shape="torus" color="#A855F7" speed={0.9} distort={0.2} />
          <FloatingGeometry position={[0, -2, -1]} shape="octahedron" color="#C084FC" speed={1.1} distort={0.3} />
          <FloatingGeometry position={[-2.5, -1.5, 1]} shape="torus" color="#7C3AED" speed={0.6} distort={0.25} />
          <FloatingGeometry position={[2.5, 2, 0]} shape="icosahedron" color="#DDD6FE" speed={0.8} distort={0.35} />

          <FloatingCube position={[-1, 2, 1]} color="#8B5CF6" speed={0.8} />
          <FloatingCube position={[1.5, -2, 0]} color="#A855F7" speed={1.2} />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Suspense>
      </Canvas>
    </div>
  );
}
