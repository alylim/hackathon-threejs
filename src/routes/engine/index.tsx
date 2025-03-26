import { createFileRoute } from "@tanstack/react-router";
import { Canvas } from "@react-three/fiber";

export const Route = createFileRoute("/engine/")({
  component: Engine,
});

function Engine() {
  return (
    <div id="canvas-container">
      <Canvas>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
