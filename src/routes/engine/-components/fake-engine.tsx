import { useRef } from "react";
import { type Mesh } from "three";
import { useFrame } from "@react-three/fiber";

type FakeEngineProps = {
  isDragging: boolean;
};

function FakeEngine({ isDragging }: FakeEngineProps) {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry args={[1, 1, 2, 12]} />
      <meshPhongMaterial color="white" transparent opacity={0.5} />
    </mesh>
  );
}

export { FakeEngine };
