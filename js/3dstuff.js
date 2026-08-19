/* Here’s how it works: The 7 dots simply move around a circle,
increasing the distance from each other while the sine and cosine
parts of the circle go out of sync
(this makes it look like the circle is “turning” in space).
Sometimes the dots overlap to give the impression of fewer dots. 
It’s hard to explain, but I find it extremely cool that they chose to use 7 dots
(rather than the more pedestrian 8).*/

//important ^^^ i found it at https://www.jesperjuul.net/ludologist/2004/10/04/serious-procrastination-the-ps2-startup-screen-recreated/
// genuinely thank god i found this article from 10+ yrs ago or i dont know how else i wouldve made this

var width = window.innerWidth;      // window height and width ofc
var height = window.innerHeight;
import * as THREE from 'three'; // import 3js package
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';             // the different extra imports, u can see what they are by name
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';

const scene = new THREE.Scene();            // three js scene
const renderer = new THREE.WebGLRenderer({  // renders the scene, canvas is selected by the id orbs
    canvas: document.querySelector("#orbs"),
});
const camera = new THREE.PerspectiveCamera(60, width/height, 0.1, 1000);    // prespective camera, fov 60, the aspect, and the far and near
const controls = new OrbitControls( camera, renderer.domElement );          // controlls from the orbit controls import
controls.enablePan = false;
controls.enableRotate = false;
controls.enableZoom = false;

renderer.setPixelRatio(window.devicePixelRatio);        // sets pixel ratio
renderer.setSize(width, height);                        // resizes the canvas size to the width and height of the window
camera.position.setZ(15);                               // move the camera a little blehhhh
controls.pan(-150,0);
controls.update();                                      // i dont even know i just saw that it was palced here in a code snippet from the 3js example for orbitcamera

const composer = new EffectComposer(renderer)           // init the composer import, lets me add effects to the render. the renderer is inputted and this holds like all of the different post processing effects
const renderPass = new RenderPass(scene, camera)        // "This class represents a render pass. It takes a camera and a scene and produces a beauty pass for subsequent post processing effects."
composer.addPass(renderPass)                            // add the render pass to the composer
const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85)  // bloom pass import
bloomPass.threshold = 0.25
bloomPass.strength = 1.25
bloomPass.radius = 0.05
composer.addPass(bloomPass)

const afterimagePass = new AfterimagePass(0);   // ill figure out thte ps2 style trail later im sleepy
composer.addPass(afterimagePass);

renderer.render(scene, camera);
const geometry = new THREE.SphereGeometry(0.2, 9, 5);
const material = new THREE.MeshStandardMaterial( {
    color: 0xffffff,
    emissive: new THREE.Color().setHex(0xa3d6ff),
    emissiveIntensity: 0.6
} );

const spheres = []
for(var i = 0; i < 7; i++){
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.setY = 2*Math.sin(toRadians(i*(360/7)));
    sphere.position.setX = 2*Math.cos(toRadians(i*(360/7)));
    sphere.position.setZ = 2*-Math.cos(toRadians(i*(360/7)));
    spheres.push(sphere)
    scene.add(sphere);
}

let angle = 0;
let distance = 0;
let modValue = 0;
function animate(){
    controls.update();
    requestAnimationFrame(animate);
    composer.render()
    
    angle += 0.01;         //im lazy i dont feel like making the sizes go back down hope i dont fry my memory
    distance += 0.05;
    modValue += 0.009;
    if(distance >= 360) distance = 0;
    spheres.forEach((sphere, i) =>{
        let sphereAngle = angle + toRadians(i * distance);
        sphere.position.x = 2*Math.cos(sphereAngle);
        sphere.position.y = 2*Math.sin(sphereAngle+(modValue+0.15));
        sphere.position.z = -2*-Math.sin(sphereAngle+(modValue+5));
    });
}

animate();

function toRadians(deg){
    return deg*(Math.PI/180);
}

function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );
				composer.setSize( window.innerWidth, window.innerHeight );

			}

window.addEventListener('resize', onWindowResize);