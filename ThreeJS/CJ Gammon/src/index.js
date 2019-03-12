import * as THREE from 'three';

window.onload = () => {
    // Renderer
    const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.z = -100;
    const scene = new THREE.Scene();
    camera.lookAt(scene.position);

    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const material = new THREE.MeshStandardMaterial({
        metalness: 0.5,
        roughness: 0.5,
        map: new THREE.TextureLoader().load('assets/textures/material/material.jpg'),
        normalMap: new THREE.TextureLoader().load('assets/textures/material/normal.jpg')
    });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    const aLight = new THREE.AmbientLight({color: 0xFFFFFF, intensity: 1});
    scene.add(aLight);
    const pLight = new THREE.PointLight({color: 0xFFFFFF, intensity: 1});
    pLight.position.z = -50;
    pLight.target = mesh;

    scene.add(pLight);

    function render() {
        mesh.rotation.y += 0.01;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
