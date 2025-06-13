import * as THREE from "three";

export function setupGrid(scene) {
    const plane = new THREE.PlaneGeometry(128, 128);
    const mat = new THREE.MeshPhongMaterial({ color: "#FFFFFF", depthWrite: false });
    const mesh = new THREE.Mesh(plane, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    const grid = new THREE.GridHelper(128, 40, "#000000", "#888888");
    grid.material.opacity = 0.9;
    grid.material.transparent = true;
    grid.position.y = -0.001;
    grid.name = "grid";
    scene.add(grid);

    const axis = new THREE.AxesHelper(2);
    axis.name = "axis";
    scene.add(axis);
}
