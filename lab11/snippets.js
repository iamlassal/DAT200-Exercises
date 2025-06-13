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

export function setupGui(scene, settings, bladeCallback) {
    const gui = new dat.GUI();
    const sun = scene.getObjectByName("dirlight");
    const ambient = scene.getObjectByName("ambientlight");

    const controls = gui.addFolder("Controls");
    controls.add(settings, "rotSpeed", 0, 0.05).name("Rotation Speed");
    controls.add(settings, "bAngle", 0, 0.3).name("Blade Angle").onChange(value => {
        bladeCallback();
    });
    controls.add(settings, "hAngle", 0, 2 * Math.PI).name("Angle");
    controls.open();

    const lightFolder = gui.addFolder("Light");
    lightFolder.add(sun, "visible").name("Sun");
    lightFolder.add(sun, "intensity", 0, 3).name("Sun Intensity");
    lightFolder.addColor({ sunColor: "#FFFFFF" }, "sunColor").name("Color").onChange(value => {
        sun.color.set(value);
    });

    lightFolder.add(ambient, "visible").name("Ambient Light");
    lightFolder.add(ambient, "intensity", 0, 3).name("Ambient Intensity");
    lightFolder.addColor({ ambientLightColor: "#FFFFFF" }, "ambientLightColor").name("Color").onChange(value => {
        ambient.color.set(value);
    });
}
