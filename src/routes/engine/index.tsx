import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Canvas } from "@react-three/fiber";
import { Cylinder } from "./-components/rotating-cylinder";
import { OrbitControls } from "@react-three/drei";
import { Color } from "three";

export const Route = createFileRoute("/engine/")({
  component: Engine,
});

const BLACK = new Color("black");

function Engine() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div id="canvas-container" style={{ width: "100dvw", height: "100dvh" }}>
      <button>
        <Link to="/engine/ultimate">To the finale</Link>
      </button>
      <Canvas
        scene={{ background: BLACK }}
        camera={{ fov: 75, near: 0.1, far: 500 }}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
      >
        <ambientLight intensity={0.7} />
        <directionalLight color="white" position={[0, 10, 0]} intensity={5} />
        <OrbitControls />
        <Cylinder color="#ae34eb" isDragging={isDragging} />
        <axesHelper args={[5]} />
      </Canvas>
    </div>
  );
}
