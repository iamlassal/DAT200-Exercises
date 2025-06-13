import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

export function loadWindmill(scene, callback) {
    return loader.load("windmill.glb", (gltf) => {
        gltf.scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        scene.add(gltf.scene);

        if (callback) {
            callback();
        }
    });
}

export function getNozzle(scene) {
    return findNode(scene, "nozzle");
}

export function getHead(scene) {
    return findNode(scene, "head");
}

export function getBlades(scene) {
    let result = [];
    result.push(findNode(scene, "blade0"));
    result.push(findNode(scene, "blade1"));
    result.push(findNode(scene, "blade2"));
    return result;
}

function findNode(scene, name) {
    let result = null;
    scene.traverse((node) => {
        if (node.name === name) {
            result = node;
        }
    });

    return result;
}