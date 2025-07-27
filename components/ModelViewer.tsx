'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

// Center the model at origin so it rotates in-place
const Model = () => {
  const gltf = useGLTF('/pandalaptop.glb');
  return (
    <primitive object={gltf.scene} scale={5} position={[0, 0.7, 0]} />
  );
};

const ModelViewer = () => {
  return (
    <div className="h-[700px] w-[700px]">
      <Canvas camera={{ position: [20, 0, -8], fov: 16.5 }}>
        {/* Original lighting setup preserved */}
        <ambientLight intensity={5} />
        <directionalLight position={[5, 2, 2]} intensity={10} />
        <directionalLight position={[20, 5, 20]} intensity={3} />

        <Suspense fallback={null}>
          <Model />
        </Suspense>

        {/* Keep rotation centered */}
        <OrbitControls enableZoom={false} enablePan={false} target={[0, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
