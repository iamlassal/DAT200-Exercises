export function getAspectRatio() {
    return window.innerWidth / window.innerHeight;
}

export function resizeWindow(camera, renderer) {
    camera.aspect = getAspectRatio();
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}