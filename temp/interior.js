import * as THREE			from './three/build/three.module.js';
import { GLTFLoader }		from './three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls }	from './three/examples/jsm/controls/OrbitControls.js';
import Stats				from './three/examples/jsm/libs/stats.module.js';
import { GUI }				from './three/examples/jsm/libs/dat.gui.module.js';
import { EffectComposer }	from './three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } 		from './three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } 	from './three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RGBELoader }		from './three/examples/jsm/loaders/RGBELoader.js';
import { ShaderPass } 		from './three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } 		from './three/examples/jsm/shaders/FXAAShader.js';
import { VRButton } 		from './three/examples/jsm/webxr/VRButton.js';
import { FilmPass }			from './three/examples/jsm/postprocessing/FilmPass.js';

let width = window.innerWidth;
let height = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, width/height, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
const composer = new EffectComposer(renderer);
const pmremGenerator = new THREE.PMREMGenerator( renderer );
const bloomPass = new UnrealBloomPass( new THREE.Vector2( width, height ));
const fxaaPass = new ShaderPass( FXAAShader );
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
const cameraPivot = new THREE.Object3D();

// const controls = new OrbitControls( camera, renderer.domElement );
const stats = new Stats();
const mouse = new THREE.Vector2(100,100);
const rayCaster = new THREE.Raycaster();

const currentFov = camera.fov;

const geometry = new THREE.BoxGeometry();
const material1 = new THREE.MeshBasicMaterial({color:0x00ff00});
const material2 = new THREE.MeshBasicMaterial({color:0x00ff00});
const material3 = new THREE.MeshBasicMaterial({color:0x00ff00});
const material4 = new THREE.MeshBasicMaterial({color:0x00ff00});

const cube1 = new THREE.Mesh(geometry,material1);
const cube2 = new THREE.Mesh(geometry,material2);
const cube3 = new THREE.Mesh(geometry,material3);
const cube4 = new THREE.Mesh(geometry,material4);
scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
scene.add(cube4);
cube1.position.set(0,0,0);
cube1.rotation.set(-0.06,4.02,0);
cube1.scale.set(0.1,0.1,0.1);
cube2.position.set(0.40,0.15,1.93);
cube2.rotation.set(-0.27,0.56,0);
cube2.scale.set(0.1,0.1,0.1);
cube3.position.set(0.12,-0.78,0.61);
cube3.rotation.set(0.12,4.53,0);
cube3.scale.set(0.1,0.1,0.1);
cube4.position.set(3,0,1);
cube4.rotation.set(-0.21,1.26,0);
cube4.scale.set(0.1,0.1,0.1);

const paramsBloom = {
	exposure: 1.28,
	bloomStrength: 0.45,
	bloomThreshold: 0.55,
	bloomRadius: 1
};


function init()
{
	load("Models/interior/scene.gltf", 0,0,2);
}


let isDown = false;
let startPos = new THREE.Vector2();
let currentPos = new THREE.Vector2();
let diffPos = new THREE.Vector2();
let currentRot = new THREE.Vector3();
let beforeMouse = new THREE.Vector3();


function ctrl( event )
{
	let eventType = event.type;


	if(eventType == "pointerdown")
	{
		console.log('down');
		isDown = true;
		
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		startPos.x = mouse.x;
		startPos.y = mouse.y;
		currentPos.x = mouse.x;
		currentPos.y = mouse.y;
		beforeMouse.x = mouse.x;
		beforeMouse.y = mouse.y;
	
		rayCaster.setFromCamera( mouse, camera );
	
		let intersects = rayCaster.intersectObjects( scene.children );
	
		for ( let i = 0; i < intersects.length; i ++ ) {
			intersects[ i ].object.material.color.set( 0x0000ff );
		}
	}
	else if(eventType == "mousemove")
	{
		console.log('mousemove');
	}

	else if(eventType == "pointerup")
	{
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		
		currentRot.x = camera.rotation.x;
		currentRot.y = cameraPivot.rotation.y;
	
		
		rayCaster.setFromCamera( mouse, camera );
	
		let intersects = rayCaster.intersectObjects( scene.children );
		for ( let i = 0; i < intersects.length; i ++ ) {
			intersects[ i ].object.material.color.set( 0x00ff00 );
			moveToTarget(cameraPivot.position, intersects[i].object.position, 1);
			rotateToTarget(camera.rotation.x, cameraPivot.rotation.y, intersects[i].object.rotation);
		}

		isDown = false;
		console.log('up');
	}

	if(eventType == "pointermove" && isDown || eventType == "touchmove")
	{
		console.log('draging');
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		
		currentPos.x = mouse.x;
		currentPos.y = mouse.y;

		diffPos.x = -(currentPos.x - startPos.x);
		diffPos.y = -(currentPos.y - startPos.y);

		camera.rotation.x = currentRot.x + diffPos.y;
		cameraPivot.rotation.y = currentRot.y + -diffPos.x;

	}


	if(event.type == 'keydown')
	{
		switch(event.key)
		{
			case 'q':
				console.log("im q / print log");
				console.log(camera.rotation.x);
				console.log(cameraPivot.rotation.y);
				break;
			case 'w':
				console.log("im w / target cube");
				break;
			case 'e':
				console.log("im e / cube position");
				break;
			case '1':
				console.log("im 1 / camera moving");
				moveToTarget(cameraPivot.position, cube1.position, 1);
				rotateToTarget(camera.rotation.x, cameraPivot.rotation.y, cube1.rotation);
				break;
			case '2':
				console.log("im 2 / camera moving");
				moveToTarget(cameraPivot.position, cube2.position, 1);
				rotateToTarget(camera.rotation.x, cameraPivot.rotation.y, cube2.rotation);
				break;
			case '3':
				console.log("im 3 / camera moving");
				moveToTarget(cameraPivot.position, cube3.position, 1);
				rotateToTarget(camera.rotation.x, cameraPivot.rotation.y, cube3.rotation);
				break;
			case '4':
				console.log("im 4 / camera moving");
				moveToTarget(cameraPivot.position, cube4.position, 1);
				rotateToTarget(camera.rotation.x, cameraPivot.rotation.y, cube4.rotation);
				break;
			default:
				console.log(event);
				break;
	
		}
	}
}

function calc()
{
	if(currentFov != camera.fov)
	{
		currentFov = camera.fov;
		camera.updateProjectionMatrix();
    }
	
	// controls.update();
	stats.update();
	TWEEN.update();
}

function draw()
{
	requestAnimationFrame( animate );
	// renderer.render( scene, camera );
	composer.render();
}

function destroy()
{
	BufferGeometry.dispose();
	Material.dispose();
	Texture.dispose();
	WebGLRenderTarget.dispose();
}

///////////////////////////////////////////////////////////////////////////////

setSystem();
setRenderer();
setEnvironment();
setLight();
setPostprocess();
setGUI();

init();
function animate()
{
	calc();
	draw();
}
animate();


// functions.
function load(path, x, y, z)
{
	console.log("load start");
	let loader = new GLTFLoader();

	loader.load(
		path,
		function (gltf) {
            gltf.scene.position.set(x,y,z);
			gltf.scene.traverse( function( node ) { // what is the traverse? : called on children
				if ( node.isMesh )
				{
					//node.position.set(x,y,z);
					node.castShadow = true;
					node.receiveShadow = true;
				}		
			} );
			scene.add(gltf.scene);
			console.log("load done");


			
			return null;
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + "% loaded");
			return null;
		},
		function (error) {
			console.error(error);
			return null;
		} 
	);
}

function setSystem()
{
	document.body.appendChild( renderer.domElement );
	document.body.appendChild( stats.dom );
	document.body.appendChild( VRButton.createButton( renderer ) );
	renderer.xr.enabled = true;

	addEventListener( 'resize', onWindowResize,	false );
	addEventListener( 'pointermove',	ctrl,	false );
	addEventListener( 'pointerdown',	ctrl,	false );
	addEventListener( 'pointerup',		ctrl,	false );
	addEventListener( 'pointercancel',	ctrl,	false );
	addEventListener( 'keydown',		ctrl,	false );
	addEventListener( 'keyup',			ctrl,	false );

	onWindowResize();

	camera.position.set(0,0,0);
	camera.rotation.set(0,0,0);
	cameraPivot.rotation.set(0,4,0);
	cameraPivot.add(camera);
	scene.add(cameraPivot);
	currentRot.set(0,4,0);
    
}


function setEnvironment()
{
	scene.background = new THREE.Color( 0xbbbbbb ); // basic background
	
	new RGBELoader()
		.setDataType( THREE.UnsignedByteType)
		.setPath('hdr/')
		.load('immenstadter_horn_1k.hdr', function ( texture ) {
			// const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
			const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
			scene.background = envMap; // skyBox
			scene.environment = envMap;
			texture.dispose();
			pmremGenerator.dispose();

		});
}


function setPostprocess()
{
	const renderPass = new RenderPass( scene, camera );
	composer.addPass( renderPass );
	
	const fxaaPass = new ShaderPass( FXAAShader );
	const pixelRatio = renderer.getPixelRatio();
	
	fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( width * pixelRatio );
	fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( height * pixelRatio );

	bloomPass.threshold = paramsBloom.bloomThreshold;
	bloomPass.strength = paramsBloom.bloomStrength;
	bloomPass.radius = paramsBloom.bloomRadius;
	
	const filmPass = new FilmPass(
		0.65,   // noise intensity
		0.025,  // scanline intensity
		648,    // scanline count
		false,  // grayscale
	);
	filmPass.renderToScreen = true;
	composer.addPass(filmPass);
	
	composer.addPass( fxaaPass );
	composer.addPass( bloomPass );
}

function setLight()
{
	const dlHelper = new THREE.DirectionalLightHelper( directionalLight, 1 );
	
	directionalLight.castShadow = true;
	directionalLight.position.set(1,2,2);
	directionalLight.rotation.set(45,0,0);
	directionalLight.shadow.camera.near = 1;
	directionalLight.shadow.camera.far = 100;
	
	//  scene.add( directionalLight );
	//scene.add( dlHelper );

	const color = 0xFFFFFF;
	const intensity = 1;
	const amLight = new THREE.AmbientLight(color, intensity);
	scene.add(amLight);

}

function setRenderer()
{
	renderer.antialias = true;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.VSMShadowMap;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = paramsBloom.exposure;
	renderer.physicallyCorrectLights = renderer.physicallyCorrectLights;
	
}

function setGUI()
{
	let gui = new GUI();
	let section = gui.addFolder('vf');
	let section2 = gui.addFolder('directionalLight');
	let section3 = gui.addFolder('car');
	let section4 = gui.addFolder('camera');
	let section5 = gui.addFolder('bloom');
	
	section2.add(directionalLight.position, 'x').min(-3).max(300).step(0.01);
	section2.add(directionalLight.position, 'y').min(-3).max(300).step(0.01);
	section2.add(directionalLight.position, 'z').min(-3).max(300).step(0.01);
	section2.add(directionalLight, 'intensity').min(0).max(10).step(0.01);
	section2.close();
	//section3.add(car.position, 'x').min(-3).max(3).step(0.1);
	//section3.open();
	section4.add(camera, 'fov').min(5).max(120).step(5);
	section4.close();
	section5.add(paramsBloom,'exposure').step(0.01).onChange(function(value) {
		renderer.toneMappingExposure = value;
	});
	section5.add(paramsBloom,'bloomStrength').step(0.01).onChange(function(value){
		bloomPass.threshold = Number(value);
	});
	section5.add(paramsBloom,'bloomThreshold').step(0.01).onChange(function(value){
		bloomPass.strength = Number(value);
	});
	section5.add(paramsBloom,'bloomRadius').step(0.01).onChange(function(value){
		bloomPass.radius = Number(value);
	});
	section5.close();
	gui.open();
	
}


function onWindowResize()
{
	const pixelRatio = window.devicePixelRatio;
	
	width  = window.innerWidth;//  * pixelRatio | 0;
	height = window.innerHeight;// * pixelRatio | 0;
	console.log(width + " / " + height);
	console.log(renderer.domElement);
	camera.aspect = width/height;
	renderer.setSize(width, height, false);
	composer.setSize(width, height);
	camera.updateProjectionMatrix();
	
	//const pixelRatio = renderer.getPixelRatio();

	// fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( width * pixelRatio );
	// fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( height * pixelRatio );
}

function moveToTarget( fromPos, toPos, percent )
{
	// let diffVec = new THREE.Vector3();
	// diffVec.x = (toPos.x - fromPos.x) * percent;
	// diffVec.y = (toPos.y - fromPos.y) * percent;
	// toPos.x = (toPos.x + diffVec.x).clone;
	// toPos.y = (toPos.y + diffVec.y).clone;
	
	const coords = {x: fromPos.x, y: fromPos.y, z: fromPos.z} // Start at (0, 0)
	const tween = new TWEEN.Tween(coords)
	.to({x:toPos.x,y:toPos.y,z:toPos.z},1000)
	.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
	.onUpdate(() => {
		cameraPivot.position.x = coords.x;
		cameraPivot.position.y = coords.y;
		cameraPivot.position.z = coords.z;
	})
	.start() // Start the tween immediately.
}

function rotateToTarget( fromRotX, fromRotY, toRot)
{
	const coords = {x: fromRotX, y: fromRotY, z: 0} // Start at (0, 0)
	const tween = new TWEEN.Tween(coords)
	.to({x:toRot.x,y:toRot.y,z:toRot.z},1000)
	.easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
	.onUpdate(() => {
		camera.rotation.x = coords.x;
		cameraPivot.rotation.y = coords.y;
		//cameraPivot.rotation.z = coords.z;
	})
	.start() // Start the tween immediately.
	currentRot.x = toRot.x;
	currentRot.y = toRot.y;
	currentRot.z = toRot.z;
	//2console.log(fromRot);
	
}