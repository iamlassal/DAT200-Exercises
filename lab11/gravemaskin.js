import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

export class GravemaskinModel {
    #headRotation = 0;
    #girder1Rotation = 0;
    #girder2Rotation = 0;
    #grabRotation = 0;

    constructor(scene) {
        this.scene = scene;
        this.base = findNode(scene, "base");
        this.sokkel = findNode(scene, "sokkel");
        this.hode = findNode(scene, "hode");
        this.bjelke1 = findNode(scene, "bjelke1");
        this.bjelke2 = findNode(scene, "bjelke2");
        this.grab = findNode(scene, "grab");

        window.addEventListener("keydown", (e) => { this.keydown(e); })
        window.addEventListener("keyup", (e) => { this.keyup(e); })
    }


    keydown(e) {
        if (e.key == "ArrowLeft") {
            this.#headRotation = 0.02;
        }
        if (e.key == "ArrowRight") {
            this.#headRotation = -0.02;
        }
        if (e.key == "ArrowUp") {
            this.#girder1Rotation = 0.02;
        }
        if (e.key == "ArrowDown") {
            this.#girder1Rotation = -0.02;
        }
        if (e.key == "w") {
            this.#girder2Rotation = 0.02;
        }
        if (e.key == "s") {
            this.#girder2Rotation = -0.02;
        }
        if (e.key == "Control") {
            this.#grabRotation = -0.05;
        }
        if (e.key == "Shift") {
            this.#grabRotation = 0.05;
        }
    }

    keyup(e) {
        console.log(e.key);
        this.#headRotation = 0;
        this.#girder1Rotation = 0;
        this.#girder2Rotation = 0;
        this.#grabRotation = 0;
    }

    tick() {
        console.log("b: " + this.#headRotation);
        this.hode.rotateY(this.#headRotation);
        this.bjelke1.rotateZ(this.#girder1Rotation);
        this.bjelke2.rotateZ(this.#girder2Rotation);
        this.grab.rotateZ(this.#grabRotation);
    }
}

export function loadGravemaskin(scene, callback) {
    return loader.load("models/gravemaskin/gravemaskin.glb", (gltf) => {

        gltf.scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });

        scene.add(gltf.scene);
        callback();
    });
}

export function findNode(scene, name) {
    let result = null;
    scene.traverse((node) => {
        if (node.name === name) {
            result = node;
        }
    });

    return result;
}