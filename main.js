import * as THREE from 'three';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
scene.background = new THREE.Color('black');
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const cubeTexture = textureLoader.load('images/stasiek.png');
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ map: cubeTexture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

let startTime = Date.now();
const duration = 4000;
let stas = 1; // użyj let zamiast const

function animate() {
  requestAnimationFrame(animate);
  const elapsedTime = Date.now() - startTime;

  if (stas === 1) {
    cube.rotation.x += 0.02;
    cube.rotation.z += 0.02;
    cube.translateX(0.01);
  } else {
    cube.rotation.x -= 0.02;
    cube.rotation.z -= 0.02;
    cube.translateX(-0.01);
  }

  if (elapsedTime >= duration) {
    stas = stas === 1 ? 0 : 1; // zmiana kierunku
    startTime = Date.now(); // restart timera
  }

  renderer.render(scene, camera);
}

animate();