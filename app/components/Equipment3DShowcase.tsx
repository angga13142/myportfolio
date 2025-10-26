"use client";
import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import {
  Maximize2,
  Info,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  Shield,
  Gauge,
  Wrench,
  X,
} from "lucide-react";
import type * as THREE from "three";
import { track3DInteraction } from "@/app/lib/analytics";

// Simple 3D Excavator Model (using basic geometries)
function ExcavatorModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Rotate model slowly when not interacting
  useFrame((state) => {
    if (groupRef.current && !state.pointer.x) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const excavatorColor = "#FFD700"; // Gold/Yellow color
  const cabinColor = "#2C3E50"; // Dark blue-gray

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Base/Tracks */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[2.5, 0.4, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Track Details */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.6, 0.2, 1.4]} />
        <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Turntable */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.9, 0.4, 16]} />
        <meshStandardMaterial
          color={excavatorColor}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Cabin */}
      <group
        position={[-0.3, 1.2, 0]}
        onPointerOver={() => setHovered("cabin")}
        onPointerOut={() => setHovered(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[1.2, 1, 1]} />
          <meshStandardMaterial
            color={hovered === "cabin" ? "#34495E" : cabinColor}
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
        {/* Windows */}
        <mesh position={[0.61, 0.1, 0]}>
          <boxGeometry args={[0.02, 0.6, 0.8]} />
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Boom (Main Arm) */}
      <group
        position={[0.3, 1.2, 0]}
        rotation={[0, 0, -0.3]}
        onPointerOver={() => setHovered("boom")}
        onPointerOut={() => setHovered(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[2, 0.3, 0.3]} />
          <meshStandardMaterial
            color={hovered === "boom" ? "#FFE44D" : excavatorColor}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* Hydraulic Cylinders */}
        <mesh position={[0.5, -0.2, 0.2]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.08, 0.08, 1, 8]} />
          <meshStandardMaterial
            color="#444444"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.5, -0.2, -0.2]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.08, 0.08, 1, 8]} />
          <meshStandardMaterial
            color="#444444"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Stick (Secondary Arm) */}
      <group
        position={[1.8, 1.8, 0]}
        rotation={[0, 0, -0.8]}
        onPointerOver={() => setHovered("stick")}
        onPointerOut={() => setHovered(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.25, 0.25]} />
          <meshStandardMaterial
            color={hovered === "stick" ? "#FFE44D" : excavatorColor}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Bucket */}
      <group
        position={[2.5, 0.8, 0]}
        rotation={[0, 0, -0.5]}
        onPointerOver={() => setHovered("bucket")}
        onPointerOut={() => setHovered(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.4, 0.8]} />
          <meshStandardMaterial
            color={hovered === "bucket" ? "#FFE44D" : excavatorColor}
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
        {/* Bucket Teeth */}
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[0.35, -0.3, -0.3 + i * 0.15]}>
            <coneGeometry args={[0.05, 0.2, 4]} />
            <meshStandardMaterial
              color="#333333"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Engine Compartment */}
      <group
        position={[-0.8, 1.0, 0]}
        onPointerOver={() => setHovered("engine")}
        onPointerOut={() => setHovered(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.6, 0.9]} />
          <meshStandardMaterial
            color={hovered === "engine" ? "#FFE44D" : excavatorColor}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </group>

      {/* Counterweight */}
      <mesh position={[-1.2, 0.8, 0]} castShadow>
        <boxGeometry args={[0.6, 0.8, 1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

// Loading Fallback
function Loader() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-zinc-400">Loading 3D Model...</p>
      </div>
    </div>
  );
}

interface Hotspot {
  id: string;
  title: string;
  description: string;
  icon: any;
  position: string;
}

const hotspots: Hotspot[] = [
  {
    id: "cabin",
    title: "Operator Cabin",
    description:
      "Climate-controlled cabin dengan ergonomic design, 360° visibility, dan advanced control system",
    icon: Shield,
    position: "Front-left",
  },
  {
    id: "boom",
    title: "Hydraulic Boom",
    description:
      "Heavy-duty boom dengan reach 9.5m, lifting capacity 15 ton, precision hydraulic controls",
    icon: Move,
    position: "Main arm",
  },
  {
    id: "bucket",
    title: "Excavator Bucket",
    description:
      "1.2m³ capacity bucket dengan reinforced teeth, optimal untuk nickel ore excavation",
    icon: Wrench,
    position: "End attachment",
  },
  {
    id: "engine",
    title: "Power Unit",
    description:
      "280HP diesel engine dengan fuel efficiency optimization, low emission standard",
    icon: Gauge,
    position: "Rear section",
  },
];

export function Equipment3DShowcase() {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    try {
      setIsClient(true);
    } catch (err) {
      console.error("Equipment3DShowcase initialization error:", err);
      setError("Failed to initialize 3D viewer");
    }
  }, []);

  const handleReset = () => {
    try {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
      track3DInteraction("Reset View");
    } catch (err) {
      console.error("Reset error:", err);
    }
  };

  const handleHotspotClick = (hotspot: Hotspot) => {
    try {
      setSelectedHotspot(hotspot);
      track3DInteraction("Hotspot Click", hotspot.title);
    } catch (err) {
      console.error("Hotspot click error:", err);
    }
  };

  if (error) {
    return (
      <div className="glass p-8 rounded-xl text-center">
        <div className="text-red-400 mb-4">
          <Shield className="w-12 h-12 mx-auto mb-2" />
          <p>{error}</p>
        </div>
        <button
          onClick={() => {
            setError(null);
            setIsClient(false);
            setTimeout(() => setIsClient(true), 100);
          }}
          className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!isClient) {
    return (
      <div className="glass p-8 rounded-xl text-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-zinc-400">Loading 3D Equipment Showcase...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">
          Interactive 3D Equipment Showcase
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Explore the excavator in 3D - rotate, zoom, and discover key features
        </p>
      </div>

      {/* 3D Viewer */}
      <div className="glass p-4 rounded-xl">
        <div className="relative aspect-video md:aspect-[16/10] bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-lg overflow-hidden">
          <Suspense fallback={<Loader />}>
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[5, 3, 5]} />

              {/* Lighting */}
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
                castShadow
                shadow-mapSize={[2048, 2048]}
              />
              <spotLight
                position={[-10, 10, -10]}
                angle={0.15}
                penumbra={1}
                intensity={0.5}
              />
              <pointLight position={[0, 5, 0]} intensity={0.3} />

              {/* Environment */}
              <Environment preset="sunset" />

              {/* Ground Shadows */}
              <ContactShadows
                position={[0, -1, 0]}
                opacity={0.5}
                scale={15}
                blur={2}
                far={4}
              />

              {/* 3D Model */}
              <ExcavatorModel />

              {/* Controls */}
              <OrbitControls
                ref={controlsRef}
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                autoRotate={autoRotate}
                autoRotateSpeed={0.5}
                minDistance={3}
                maxDistance={15}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </Suspense>

          {/* Control Panel Overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                autoRotate
                  ? "bg-green-500/20 text-green-400"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50"
              }`}
              title="Auto Rotate"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 rounded-lg backdrop-blur-md transition-colors"
              title="Reset View"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-4 bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-lg text-sm text-zinc-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <Move className="w-4 h-4" />
                Drag to rotate
              </span>
              <span className="flex items-center gap-2">
                <ZoomIn className="w-4 h-4" />
                Scroll to zoom
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {hotspots.map((hotspot) => {
          const Icon = hotspot.icon;
          return (
            <div
              key={hotspot.id}
              className="glass p-4 rounded-xl cursor-pointer hover-lift transition-all"
              onClick={() => handleHotspotClick(hotspot)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Icon className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-100 mb-1">
                    {hotspot.title}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">
                    {hotspot.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Specs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">280HP</div>
          <div className="text-sm text-zinc-400 mt-1">Engine Power</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">20.6t</div>
          <div className="text-sm text-zinc-400 mt-1">Operating Weight</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">1.2m³</div>
          <div className="text-sm text-zinc-400 mt-1">Bucket Capacity</div>
        </div>
        <div className="glass p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-400">9.5m</div>
          <div className="text-sm text-zinc-400 mt-1">Max Reach</div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedHotspot && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedHotspot(null)}
        >
          <div
            className="glass max-w-2xl w-full p-6 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  {(() => {
                    const Icon = selectedHotspot.icon;
                    return <Icon className="w-6 h-6 text-green-400" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-zinc-100">
                    {selectedHotspot.title}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {selectedHotspot.position}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              {selectedHotspot.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Equipment3DShowcase;
