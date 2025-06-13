import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { setupLights } from "./lighting.js";
import { setupGrid } from "./grid.js";
import { resizeWindow, getAspectRatio } from "./utils.js";
import * as GRAV from "./gravemaskin.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, getAspectRatio(), 1, 2048);
const renderer = new THREE.WebGLRenderer({ antialias: true });
let gravemaskin = null;

let rotation = 0.0;

window.addEventListener("resize", resizeWindow(camera, renderer));

function main() {
    renderer.shadowMap.enabled = true;
    scene.background = new THREE.Color("#88d9ff");
    scene.fog = new THREE.Fog("#e7dfb0");

    setupLights(scene);
    setupGrid(scene);
    GRAV.loadGravemaskin(scene, () => {
        gravemaskin = new GRAV.GravemaskinModel(scene);
    });

    camera.position.set(20, 15, 20);
    camera.lookAt(0, 0, 0);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, 2, 0);
    orbitControls.update();

    document.body.appendChild(renderer.domElement);
    renderScene();
}



function renderScene() {
    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
    if (gravemaskin !== null) {
        gravemaskin.tick();
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", main);
window.addEventListener("resize", () => resizeWindow(camera, renderer));

