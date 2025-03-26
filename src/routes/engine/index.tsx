import { createFileRoute } from "@tanstack/react-router";
import { Canvas } from "@react-three/fiber";
import { PhongedCube } from "./-components/phonged-cube";

export const Route = createFileRoute("/engine/")({
  component: Engine,
});

function Engine() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ fov: 75, near: 0.1, far: 5 }}>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} intensity={3} />
        <PhongedCube transposeX={0} color="royalBlue" />
        <PhongedCube transposeX={4} color="green" />
        <PhongedCube transposeX={-4} color="red" />
      </Canvas>
    </div>
  );
}
