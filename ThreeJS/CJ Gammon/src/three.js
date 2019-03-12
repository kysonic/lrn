import * as THREE from 'three';

window.onload = () => {
    // Renderer
    const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.y = 300;
    // Scene
    const scene = new THREE.Scene();
    camera.lookAt(scene.position);
    // Material
    const material = new THREE.MeshNormalMaterial();
    // Geometry
    // Box
    const geometry = new THREE.BoxBufferGeometry(100, 100, 100, 10, 10, 10);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -400;
    mesh.position.x = 0;
    mesh.castShadow = true;
    scene.add(mesh);
    // Plane
    const planeGeometry = new THREE.PlaneGeometry(500, 500, 10, 10);
    const planeMesh = new THREE.Mesh(planeGeometry, material);
    planeMesh.position.z = -300;
    planeMesh.position.y = -50;
    planeMesh.rotation.x = -90 * Math.PI / 180;
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);

    // Lights
    const aLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(aLight);
    // Spot light
    const sLight = new THREE.SpotLight(0xffffff, 4, 1000);
    sLight.position.y = 500;
    sLight.position.z = 100;
    //sLight.lookAt(mesh.position);
    sLight.castShadow = true;
    //Shadow
    sLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(100, 1, 500, 1000));
    sLight.shadow.bias = 0.00001;
    sLight.shadow.mapSize.width = 2048 * 2;
    sLight.shadow.mapSize.height = 2048 * 2;

    scene.add(sLight);

    const sLightHelper = new THREE.SpotLightHelper(sLight);
    scene.add(sLightHelper);

    requestAnimationFrame(render);

    let delta = 0;
    function render() {
        delta += 0.01;
        //mesh.rotation.x += 0.01;
        //mesh.rotation.y += 0.01;
        camera.lookAt(mesh.position);
        camera.position.x = mesh.position.x + Math.sin(delta) * 1000;
        camera.position.z = mesh.position.z + Math.cos(delta) * 1000;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
}
