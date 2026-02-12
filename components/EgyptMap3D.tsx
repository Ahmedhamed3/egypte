'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Stars } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { placeData } from '@/lib/content';
import { useExplorerStore } from '@/lib/store/useExplorerStore';

function Hotspot({ id, position, label }: { id: string; position: [number, number, number]; label: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const selectPlace = useExplorerStore((s) => s.selectPlace);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.9;
      const scale = hovered ? 1.25 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.15);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => selectPlace(id)}
    >
      <sphereGeometry args={[0.08, 32, 32]} />
      <meshStandardMaterial emissive={hovered ? '#67e8f9' : '#fbbf24'} emissiveIntensity={hovered ? 1 : 0.5} color="#fff7d4" />
      <Html distanceFactor={8} position={[0, 0.16, 0]}>
        <div className="rounded-full bg-slate-900/80 px-2 py-1 text-[10px] font-semibold text-white">{label}</div>
      </Html>
    </mesh>
  );
}

function EgyptMesh() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
  });

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1, -0.8);
    s.lineTo(-0.8, 0.8);
    s.lineTo(0.4, 1);
    s.lineTo(1, 0.1);
    s.lineTo(0.8, -0.9);
    s.closePath();
    return s;
  }, []);

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <extrudeGeometry args={[shape, { depth: 0.14, bevelEnabled: false }]} />
      <meshStandardMaterial color="#f3cd84" roughness={0.8} metalness={0.1} />
    </mesh>
  );
}

export function EgyptMap3D() {
  const lang = useExplorerStore((s) => s.language);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setWebgl(typeof window !== 'undefined' && !!window.WebGLRenderingContext);
  }, []);

  if (!webgl) {
    return (
      <section className="panel flex h-[420px] items-center justify-center p-4 text-center text-sm text-cyan-100">
        {lang === 'en'
          ? '3D mode requires WebGL support. You can still explore stories and missions below.'
          : 'الوضع ثلاثي الأبعاد يحتاج دعم WebGL. يمكنك متابعة القصص والمهام بالأسفل.'}
      </section>
    );
  }

  return (
    <section className="panel relative h-[420px] w-full overflow-hidden">
      <Canvas camera={{ position: [0, 0.4, 2.4], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight intensity={1.2} position={[2, 2, 2]} />
        <Stars radius={30} depth={60} count={1200} factor={2.5} fade />
        <EgyptMesh />
        {placeData.places.map((place) => (
          <Hotspot key={place.id} id={place.id} position={place.coordinates} label={place.name[lang]} />
        ))}
        <OrbitControls enablePan={false} minDistance={1.9} maxDistance={3.5} />
      </Canvas>
      <div className="pointer-events-none absolute left-3 top-3 rounded-xl bg-slate-950/70 px-3 py-2 text-xs text-cyan-100">
        {lang === 'en' ? 'Tap glowing hotspots to travel' : 'اضغط النقاط المضيئة للانتقال'}
      </div>
    </section>
  );
}
