import { useGLTF } from "@react-three/drei";
import meshUrl from "./aircraft_mesh.glb";
import { Vector3 } from "@react-three/fiber";
import { Color, MeshStandardMaterial } from "three";
import { MathUtils } from "three";
import { useEffect, useRef } from "react";
import { MeshPhongMaterial } from "three";

const colorMap = {
  aft_fuselageobj: "red",
  forward_fuselageobj: "green",
  horizontal_stabiliserobj: "blue",
  left_engineobj: "yellow",
  left_main_landing_gearobj: "orange",
  left_wingobj: "pink",
  nose_landing_gearobj: "cyan",
  radomeobj: "purple",
  right_engineobj: "aqua",
  right_main_landing_gearobj: "beige",
  right_wingobj: "crimson",
  vertical_stabiliserobj: "gold",
};

// Random colors

// const colorMap = {
//     "aft_fuselageobj": new Color(MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1)),
//     "forward_fuselageobj": new Color(MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1)),
//     "horizontal_stabiliserobj": new Color(MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1)),
//     "left_engineobj": new Color(MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1)),
//     "left_main_landing_gearobj": new Color(MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1)),
//     "left_wingobj": new Color(MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1)),
//     "nose_landing_gearobj": new Color(MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1)),
//     "radomeobj": new Color(MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1)),
//     "right_engineobj": new Color(MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1)),
//     "right_main_landing_gearobj": new Color(MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1)),
//     "right_wingobj": new Color(MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1)),
//     "vertical_stabiliserobj": new Color(MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1), MathUtils.randFloat(0, 1)),
//   };

export function AircraftMesh({ position }: { position: Vector3 }) {
  const { scene } = useGLTF(meshUrl);
  const randomColors = useRef([]);

  useEffect(() => {
    // Only generate random colors if it's not already done
    scene.traverse((child) => {
      if (child.isMesh && child.name && colorMap[child.name]) {
        child.material = new MeshPhongMaterial({
          color: colorMap[child.name], // Apply the same color
          transparent: true,
          opacity: 0.5, // Set opacity for translucency
          shininess: 30, // Set shininess (affects specular reflection)
        });
      } else {
        console.log(child.name);
      }
    });
  }, [scene]);

  return <primitive position={position} object={scene} />;
}
