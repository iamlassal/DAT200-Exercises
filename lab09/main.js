
document.addEventListener("DOMContentLoaded", main);
window.addEventListener("resize", resizeWindow);

import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, getAspectRatio(), 1, 2048);
const renderer = new THREE.WebGLRenderer({ antialiasing: true });
const gui = new dat.GUI();

const settings = {
    rotation: {
        x: 0.0,
        y: 0.0,
        z: 0.0,
    },
    ambientLightColor: "#FFFFFF",
    sunColor: "#FFFFFF",
    prismColor: "#0156f5",
    prismSpecular: "#aaaaaa",
    prismEmissive: "#000000",
    prismEmissiveIntensity: 1,
    wireColor: "#000000"
};

function createPrism(name) {
    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([
        0, 3, 0,
        1, 0, 1,
        -1, 0, 1,
        1, 0, -1,
        -1, 0, -1
    ]);

    const indices = [
        2, 1, 0,
        1, 3, 0,
        4, 2, 0,
        3, 4, 0,
        2, 4, 3,
        1, 2, 3
    ];

    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    const solidMat = new THREE.MeshPhongMaterial({ color: settings.prismColor, flatShading: true });
    const solid = new THREE.Mesh(geometry, solidMat);
    solid.castShadow = true;
    solid.receiveShadow = true;

    const wireMat = new THREE.MeshPhongMaterial({ color: settings.wireColor, wireframe: true });
    const wire = new THREE.Mesh(geometry, wireMat);
    wire.scale.multiplyScalar(1.001);

    const result = new THREE.Group();
    result.add(solid, wire);
    result.name = name;

    return result;
}

function main() {
    renderer.shadowMap.enabled = true;
    scene.background = new THREE.Color("#88d9ff");
    scene.fog = new THREE.Fog("#e7dfb0");

    letThereBeLight();

    const prism = createPrism("prism");
    prism.position.set(0, 3, 0);
    scene.add(prism);

    camera.position.set(10, 15, 10);
    camera.lookAt(0, 0, 0);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const orbitCtr = new OrbitControls(camera, renderer.domElement);
    orbitCtr.target.set(prism.position.x, prism.position.y, prism.position.z);
    orbitCtr.update();

    setupGrid();
    document.body.appendChild(renderer.domElement);
    setupGui();
    renderScene();
}

function renderScene() {
    scene.getObjectByName("prism").rotation.x += settings.rotation.x % 360;
    scene.getObjectByName("prism").rotation.y += settings.rotation.y % 360;
    scene.getObjectByName("prism").rotation.z += settings.rotation.z % 360;
    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
}

function getAspectRatio() {
    return window.innerWidth / window.innerHeight;
}

function resizeWindow() {
    camera.aspect = getAspectRatio();
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function setupGui() {
    const prism = scene.getObjectByName("prism");
    const prismSolid = prism.children[0];
    const prismWire = prism.children[1];
    const sun = scene.getObjectByName("dirlight");
    const ambient = scene.getObjectByName("ambientlight");

    const rotFolder = gui.addFolder("Rotation");
    rotFolder.add(settings.rotation, "x", 0, 0.1).name("X");
    rotFolder.add(settings.rotation, "y", 0, 0.1).name("Y");
    rotFolder.add(settings.rotation, "z", 0, 0.1).name("Z");
    rotFolder.open();

    const posFolder = gui.addFolder("Position");
    posFolder.add(prism.position, "x", -5, 5);
    posFolder.add(prism.position, "y", -5, 5);
    posFolder.add(prism.position, "z", -5, 5);

    const matFolder = gui.addFolder("Material");
    matFolder.addColor(settings, "prismColor").name("Color").onChange((value) => {
        prismSolid.material.color.set(value);
    });
    matFolder.addColor(settings, "prismSpecular").name("Specular").onChange((value) => {
        prismSolid.material.specular.set(value);
    });
    matFolder.addColor(settings, "prismEmissive").name("Emissive").onChange((value) => {
        prismSolid.material.emissive.set(value);
    });
    matFolder.add(prismSolid.material, "shininess", 0, 100).name("Shinyness");
    matFolder.add(prismSolid.material, "emissiveIntensity", 0, 1).name("Emission");

    matFolder.add(prismSolid.material, "reflectivity", 0, 1).name("Reflecitivity");
    matFolder.add(prismSolid.material, "transparent").name("Transparent");
    matFolder.add(prismSolid.material, "opacity", 0, 1).name("Opacity");

    matFolder.addColor(settings, "wireColor").name("Edge Color").onChange((value) => {
        prismWire.material.color.set(value);
    });
    matFolder.add(prismWire, "visible").name("Show Edges");


    const lightFolder = gui.addFolder("Light");

    const sunFolder = lightFolder.addFolder("Sun");
    sunFolder.add(sun, "visible").name("Sun");
    sunFolder.add(sun, "intensity", 0, 3).name("Sun Intensity");
    sunFolder.addColor(settings, "sunColor").name("Color").onChange((value) => {
        sun.color.set(value);
    });

    const ambientFolder = lightFolder.addFolder("Ambient");
    ambientFolder.add(ambient, "visible").name("Ambient Light");
    ambientFolder.add(ambient, "intensity", 0, 3).name("Ambient Intensity");
    ambientFolder.addColor(settings, "ambientLightColor").name("Color").onChange((value) => {
        ambient.color.set(value);
    });

    const debugFolder = gui.addFolder("Debug");
    debugFolder.add(scene.getObjectByName("spothelper"), "visible").name("Sun Helper");
    debugFolder.add(scene.getObjectByName("grid"), "visible").name("Grid");
    debugFolder.add(scene.getObjectByName("axis"), "visible").name("Axis");
}


function letThereBeLight() {
    const ambientLight = new THREE.AmbientLight(settings.ambientLightColor, 1);
    ambientLight.name = "ambientlight"
    scene.add(ambientLight);

    const spotLight = new THREE.DirectionalLight(settings.sunColor, 1.5);
    spotLight.castShadow = true;
    spotLight.shadow.camera.top = 8;
    spotLight.shadow.camera.bottom = -4;
    spotLight.shadow.camera.left = -3;
    spotLight.shadow.camera.right = 3;
    spotLight.shadow.mapSize.set(2048, 2048);
    spotLight.shadow.radius = 6;
    spotLight.shadowMapVisible = true;

    spotLight.position.set(1, 5, 4);
    spotLight.name = "dirlight";
    scene.add(spotLight);

    const spotCamHelper = new THREE.CameraHelper(spotLight.shadow.camera);
    spotCamHelper.name = "spothelper";
    spotCamHelper.visible = false;
    scene.add(spotCamHelper);
}

function setupGrid() {
    const plane = new THREE.PlaneGeometry(64, 64);
    const mat = new THREE.MeshPhongMaterial({ color: "#FFFFFF", depthWrite: false });
    const mesh = new THREE.Mesh(plane, mat);
    mesh.position.y = 0.001;
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    const grid = new THREE.GridHelper(64, 40, "#000000", "#888888");
    grid.material.opacity = 0.9;
    grid.material.transparent = true;
    grid.position.y = -0.001;
    grid.name = "grid";
    scene.add(grid);

    const axis = new THREE.AxesHelper(2);
    axis.name = "axis";
    scene.add(axis);

}