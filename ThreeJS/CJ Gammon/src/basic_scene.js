import * as THREE from 'three';

window.onload = () => {
    // Renderer
    const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
    // Scene
    const scene = new THREE.Scene();
    // Lights
    const aLight = new THREE.AmbientLight(0xffffff, 0,5);
    scene.add(aLight);
    const pLight = new THREE.PointLight(0xffffff, 0.5);
    scene.add(pLight);
    // Geometry
    const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
    const boxMaterial = new THREE.MeshLambertMaterial({color: 0xf3ff33});
    const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
    mesh.position.set(0, 0, -1000);

    scene.add(mesh);


    requestAnimationFrame(render);

    function render() {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
}
