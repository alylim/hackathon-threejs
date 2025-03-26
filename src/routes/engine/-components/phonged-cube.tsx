import { useRef, useState } from "react";
import type { BoxGeometry, Mesh } from "three";
import { Html } from "@react-three/drei";

type BoxGeometryArgs = ConstructorParameters<typeof BoxGeometry>;

type PhongedCubeProps = {
  color: string;
  boxGeometryArgs: BoxGeometryArgs;
  label: string;
} & React.ComponentProps<"mesh">;

function PhongedCube({ position, boxGeometryArgs, color, label }: PhongedCubeProps) {
  const meshRef = useRef<Mesh>(null);

  const [isHovering, setIsHovering] = useState(false);

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setIsHovering(true)}
      onPointerOut={() => setIsHovering(false)}
    >
      <boxGeometry args={boxGeometryArgs} />
      <meshPhongMaterial color={color} />

      {isHovering && label && (
        <Html position={[0, 0.5, 0]} center>
          <div
            style={{ background: "black", color: "white", padding: "4px 8px", borderRadius: "4px" }}
          >
            {label}
          </div>
        </Html>
      )}
    </mesh>
  );
}

export { PhongedCube };
