import React from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

function Cube() {
  const cube = React.useRef<Mesh>(null);
  useFrame(() => {
    if (cube.current) {
      cube.current.rotation.x += 0.01;
      cube.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={cube}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#00ff00" />
    </mesh>
  );
}

export { Cube };
