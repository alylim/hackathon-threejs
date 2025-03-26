import { Canvas, useThree } from "@react-three/fiber";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Color } from "three";
import { OrbitControls } from "@react-three/drei";
import { FakeEngine } from "./-components/fake-engine";
import { PhongedCube } from "./-components/phonged-cube";

export const Route = createFileRoute("/engine/ultimate")({
  component: Ultimate,
});

const NAVY = new Color("navy");

function Ultimate() {
  const [isDragging, setIsDragging] = useState(false);
  const [activeTarget, setActiveTarget] = useState<[number, number, number] | null>(null);

  return (
    <div id="canvas-container" style={{ width: "100dvw", height: "100dvh" }}>
      <Canvas
        scene={{ background: NAVY }}
        camera={{ fov: 75, near: 0.1, far: 500 }}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
      >
        <ambientLight intensity={0.7} />
        <directionalLight color="white" position={[0, 10, 0]} intensity={5} />
        <OrbitControls />

        <CameraController targetArgs={activeTarget} />

        <group>
          <FakeEngine isDragging={isDragging} />
          <PhongedCube
            color="brown"
            boxGeometryArgs={[0.5, 0.3, 0.3]}
            position={[-0.5, -0.5, -0.6]}
            label="Oil Tank"
          />
          <PhongedCube
            color="orange"
            boxGeometryArgs={[2, 0.1, 0.1]}
            position={[0, 0.6, 0.6]}
            label="EEC 1A Elec Harness"
          />
          <PhongedCube
            color="black"
            boxGeometryArgs={[0.1, 1, 1]}
            position={[0.8, -0.3, 0]}
            label="EEC"
          />
        </group>

        <axesHelper args={[5]} />
      </Canvas>

      <div style={{ position: "absolute", top: 60, left: 20 }}>
        <button onClick={() => setActiveTarget([-0.5, -0.5, -0.6])}>Oil Tank</button>
        <button onClick={() => setActiveTarget([2, 0.1, 0.1])}>EEC 1A Elec Harness</button>
        <button onClick={() => setActiveTarget([0.1, 1, 1])}>EEC</button>
      </div>
    </div>
  );
}

function computeCameraSettings(geometryArgs: [number, number, number]) {
  const [width, height, depth] = geometryArgs;

  // Compute diagonal size for FOV calculation
  const size = Math.sqrt(width ** 2 + height ** 2 + depth ** 2);

  // Distance factor: ensure full view based on size
  const distance = size * 1.5;

  // Field of view: calculate dynamically to fit the object
  const fov = Math.min(75, Math.atan(size / (2 * distance)) * (180 / Math.PI) * 2);

  // Camera position along the vector from (0,0,0) through object center
  const direction = [width / 2, height / 2, depth / 2].map((v) => (v > 0 ? 1 : -1)); // Adjust direction
  const position = direction.map((v) => v * distance) as [number, number, number];

  return { fov, position };
}

function CameraController({ targetArgs }: { targetArgs: [number, number, number] | null }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!targetArgs) return;

    const { fov, position } = computeCameraSettings(targetArgs);

    camera.fov = fov;
    camera.position.set(...position);
    camera.lookAt(0, 0, 0); // Look at FakeEngine center (0,0,0)
    camera.updateProjectionMatrix();
  }, [targetArgs]);

  return null;
}
