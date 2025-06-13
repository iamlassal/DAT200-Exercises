import * as dat from "dat.gui";

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
