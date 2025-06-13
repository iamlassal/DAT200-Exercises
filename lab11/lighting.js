import * as THREE from "three";

export function setupLights(scene) {
    const ambientLight = new THREE.AmbientLight("#FFFFFF", 1);
    ambientLight.name = "ambientlight";
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("#FFFFFF", 1.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -20;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.mapSize.set(4096, 4096);
    directionalLight.position.set(50, 50, 50);
    directionalLight.name = "dirlight";
    scene.add(directionalLight);

    const spotHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    spotHelper.name = "spothelper";
    spotHelper.visible = false;
    scene.add(spotHelper);
}
