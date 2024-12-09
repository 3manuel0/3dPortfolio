import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const mouse = {
  LEFT_BUTTON: 0,
  RIGHT_BUTTON: 2,
};

Object.freeze(mouse);
const BODY = document.body;
const WIDTH = BODY.offsetWidth;
const HEIGHT = BODY.offsetHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 2000);
const text = document.getElementById("info");
let isLeftMouseDown = false;
let isRightMouseDown = false;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
BODY.appendChild(renderer.domElement);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshMatcapMaterial({ color: 0x0079f1 });

const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshBasicMaterial({
  color: 0x3f9b0b,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
const cube = new THREE.Mesh(geometry, material);
scene.background = new THREE.Color(0x87ceeb);
floor.rotation.x = -1;
floor.position.y = -1;
scene.add(cube);
scene.add(floor);
camera.position.z = 3;
// text.innerHTML
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  text.innerHTML = `x : ${cube.rotation.x.toFixed(
    2
  )} </br>y : ${cube.rotation.y.toFixed(2)}`;

  if (isLeftMouseDown) {
    camera.position.z += 0.1;
  }

  if (isRightMouseDown) {
    camera.position.z -= 0.1;
  }

  renderer.setSize(BODY.offsetWidth, BODY.offsetHeight);
  camera.aspect = BODY.offsetWidth / BODY.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
window.onload = () => {
  window.onmousedown = (event) => {
    event.preventDefault();
    if (event.button === mouse.LEFT_BUTTON) {
      isLeftMouseDown = true;
    }
    if (event.button === mouse.RIGHT_BUTTON) {
      isRightMouseDown = true;
    }
  };
  window.onmouseup = (event) => {
    if (event.button === mouse.LEFT_BUTTON) {
      isLeftMouseDown = false;
    }
    if (event.button === mouse.RIGHT_BUTTON) {
      isRightMouseDown = false;
    }
  };
  BODY.oncontextmenu = (event) => {
    console.log(event);
    event.preventDefault();
    return false;
  };
};
