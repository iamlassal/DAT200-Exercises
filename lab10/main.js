import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { setupLights } from "./lighting.js";
import { setupGrid } from "./grid.js";
import { setupGui } from "./gui.js";
import { resizeWindow, getAspectRatio } from "./utils.js";
import { getHead, loadWindmill, getNozzle, getBlades } from "./load.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, getAspectRatio(), 1, 2048);
const renderer = new THREE.WebGLRenderer({ antialias: true });
let nozzle = null;
let head = null;
let blades = [];

let bladeData;

window.addEventListener("resize", resizeWindow(camera, renderer));

const settings = {
    rotSpeed: 0,
    bAngle: 0,
    hAngle: 0,
};

function main() {
    renderer.shadowMap.enabled = true;
    scene.background = new THREE.Color("#88d9ff");
    scene.fog = new THREE.Fog("#e7dfb0");

    loadWindmill(scene, () => {
        nozzle = getNozzle(scene);
        head = getHead(scene);
        blades = getBlades(scene);
        bladeData = blades.reduce((acc, blade) => {
            acc[blade.name] = {
                rotation: blade.rotation.clone(),
                name: blade.name
            };
            return acc;
        }, {});
    });

    setupLights(scene);
    setupGrid(scene);
    setupGui(scene, settings, bladeCallback);

    camera.position.set(20, 15, 20);
    camera.lookAt(0, 0, 0);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.target.set(0, 20, 0);
    orbitControls.update();

    document.body.appendChild(renderer.domElement);
    renderScene();
}

function bladeCallback() {
    if (blades.length === 3) {
        blades.forEach(blade => {
            const ogRot = bladeData[blade.name].rotation;
            blade.rotation.set(ogRot.x, ogRot.y, ogRot.z);
            blade.rotateY(- settings.bAngle);
        });
    }
}

function renderScene() {
    if (nozzle) {
        nozzle.rotation.y += settings.rotSpeed;
    }
    if (head) {
        head.rotation.z = settings.hAngle;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
}

// Event listeners
document.addEventListener("DOMContentLoaded", main);
window.addEventListener("resize", () => resizeWindow(camera, renderer));

