import { useRef } from "react";
import { type Mesh, type Clock } from "three";
import { useFrame } from "@react-three/fiber";

type PhongedCubeProps = {
  transposeX: number;
  color: string;
};

function PhongedCube({ transposeX, color }: PhongedCubeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }: { clock: Clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime);
    }
  });

  return (
    <mesh ref={meshRef} position={[transposeX, 0, 0]}>
      <boxGeometry args={[3, 3, 3]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
}

export { PhongedCube };
