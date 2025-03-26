# hackathon-threejs
Experimenting with threejs for aicadium hackathon 2025


## Hangar visualization

### Data

Generate aircraft mesh from trimesh to GLB:
```python
import trimesh
import os

scene = trimesh.Scene()

MESH_DIR = "data/hangar/a350_head_in_mesh"

meshes = [
    "aft_fuselage",
    "forward_fuselage",
    "horizontal_stabiliser",
    "left_engine",
    "left_main_landing_gear",
    "left_wing",
    "nose_landing_gear",
    "radome",
    "right_engine",
    "right_main_landing_gear",
    "right_wing",
    "vertical_stabiliser",
]

for mesh in meshes:
    mesh_ = trimesh.load_mesh(os.path.join(MESH_DIR, f"{mesh}.obj"))
    scene.add_geometry(mesh_)

scene.export(file_obj="aircraft_mesh.glb")
```

Add batch merged tracks JSON data to `src/routes/hangar/tracks.json`. (Tested with single row)
