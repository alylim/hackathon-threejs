import { useEffect, useState } from "react";

export function People({ positions }) {
  return (
    <>
      {positions.map((pos, index) => (
        <mesh key={index} position={[pos[0], pos[2], pos[1]]}>
        <boxGeometry args={[1, 1.8, 1]} />  {/* Width, Height, Depth */}
          <meshStandardMaterial color="blue" />
        </mesh>
      ))}
    </>
  );
}
