import { useRef } from "react";
import { type Mesh } from "three";
import { useFrame } from "@react-three/fiber";

type CylinderProps = {
  transposeX?: number;
  color: string;
  isDragging: boolean;
};

function Cylinder({ transposeX = 0, color, isDragging }: CylinderProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current && !isDragging) {
      meshRef.current.rotation.x += 0.003;
    }
  });

  return (
    <mesh ref={meshRef} position={[transposeX, 0, 0]}>
      <cylinderGeometry args={[1, 1, 2, 12]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
}

export { Cylinder };
