import { useGLTF } from "@react-three/drei";
import meshUrl from "./aircraft_mesh.glb";
import { Vector3 } from "@react-three/fiber";

export function AircraftMesh({ position }: { position: Vector3 }) {
  const { scene } = useGLTF(meshUrl);
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.transparent = true;
      child.material.opacity = 0.5; // Adjust the opacity (0 = fully transparent, 1 = fully opaque)
    }
  });

  return <primitive position={position} object={scene} />;
}
