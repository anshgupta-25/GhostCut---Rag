import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere, Torus, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

/* ── Animated ghost-teal sphere ── */
function GhostSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1.4, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#2dd4a8"
          roughness={0.15}
          metalness={0.8}
          distort={0.35}
          speed={2.5}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

/* ── Orbiting ring ── */
function OrbitRing({ radius = 2.2, color = "#2dd4a8" }: { radius?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.PI / 2 + Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Torus ref={meshRef} args={[radius, 0.04, 16, 100]} position={[0, 0, 0]}>
      <meshStandardMaterial color={color} transparent opacity={0.5} />
    </Torus>
  );
}

/* ── Floating icosahedron ── */
function FloatingGem({ position, scale = 0.3, color = "#40e0d0" }: { position: [number, number, number]; scale?: number; color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.7;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={2}>
      <Icosahedron ref={meshRef} args={[scale, 1]} position={position}>
        <MeshWobbleMaterial
          color={color}
          factor={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.7}
        />
      </Icosahedron>
    </Float>
  );
}

/* ── Particle field ── */
function ParticleField({ count = 150 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.03;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#2dd4a8" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* ── Main 3D Scene ── */
export function HeroScene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-3, -3, 2]} intensity={0.5} color="#2dd4a8" />
          <pointLight position={[3, 3, -2]} intensity={0.3} color="#40e0d0" />

          <GhostSphere />
          <OrbitRing radius={2.4} color="#2dd4a8" />
          <OrbitRing radius={3.0} color="#40e0d0" />

          <FloatingGem position={[2.5, 1.2, -1]} scale={0.25} color="#2dd4a8" />
          <FloatingGem position={[-2.8, -0.8, -0.5]} scale={0.18} color="#40e0d0" />
          <FloatingGem position={[1.5, -1.8, 0.5]} scale={0.2} color="#5eead4" />
          <FloatingGem position={[-1.8, 1.5, 1]} scale={0.15} color="#99f6e4" />

          <ParticleField count={120} />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* ── Smaller 3D scene for feature sections ── */
function MiniSphere({ color = "#2dd4a8" }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.4;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.15;
    }
  });

  return (
    <Float speed={2.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[0.8, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.7}
          distort={0.3}
          speed={3}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
}

export function MiniScene3D({ color = "#2dd4a8" }: { color?: string }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 3, 3]} intensity={0.6} />
          <pointLight position={[-2, -1, 2]} intensity={0.4} color={color} />
          <MiniSphere color={color} />
          <OrbitRing radius={1.3} color={color} />
        </Suspense>
      </Canvas>
    </div>
  );
}
