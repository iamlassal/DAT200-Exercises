import * as THREE from "three";

export function setupScene(scene, renderer) {
    scene.background = new THREE.Color("#88d9ff");
    scene.fog = new THREE.Fog("#e7dfb0");
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function letThereBeLight(scene) {
    const ambientLight = new THREE.AmbientLight("#FFFFFF", 1);
    ambientLight.name = "ambientlight";
    scene.add(ambientLight);

    const spotLight = new THREE.DirectionalLight("#FFFFFF", 1.5);
    spotLight.castShadow = true;
    spotLight.position.set(50, 50, 50);
    spotLight.name = "dirlight";
    scene.add(spotLight);

    const spotHelper = new THREE.CameraHelper(spotLight.shadow.camera);
    spotHelper.name = "spothelper";
    spotHelper.visible = false;
    scene.add(spotHelper);
}