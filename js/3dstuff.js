/* Here’s how it works: The 7 dots simply move around a circle,
increasing the distance from each other while the sine and cosine
parts of the circle go out of sync
(this makes it look like the circle is “turning” in space).
Sometimes the dots overlap to give the impression of fewer dots. 
It’s hard to explain, but I find it extremely cool that they chose to use 7 dots
(rather than the more pedestrian 8).*/

//important ^^^
var width = window.innerWidth;
var height = window.innerHeight;
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#orbs"),
});
const camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 1000);
const controls = new OrbitControls( camera, renderer.domElement );


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
camera.position.setZ(30);
controls.update();

const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)
const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85)
bloomPass.threshold = 0.2
bloomPass.strength = 5
bloomPass.radius = 0.4
composer.addPass(bloomPass)

renderer.render(scene, camera);
const geometry = new THREE.SphereGeometry(0.2, 9, 5);
const material = new THREE.MeshStandardMaterial( {
    color: 0xffffff,
    emissive: new THREE.Color().setHex(0xa3dcff),
    emissiveIntensity: 0.5
} );

const spheres = []
for(var i = 0; i < 7; i++){
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = (i*10);
    spheres.push(sphere)
    scene.add(sphere);
}

function animate(){
    controls.update();
    requestAnimationFrame(animate);
    composer.render()
}

animate();