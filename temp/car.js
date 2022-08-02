import * as THREE			from './three/build/three.module.js';
import { GLTFLoader }		from './three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls }	from './three/examples/jsm/controls/OrbitControls.js';
import Stats				from './three/examples/jsm/libs/stats.module.js';
import { GUI }				from './three/examples/jsm/libs/dat.gui.module.js';
import { EffectComposer }	from './three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } 		from './three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } 	from './three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RGBELoader }		from './three/examples/jsm/loaders/RGBELoader.js';
import { ShaderPass } 		from './three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } 		from './three/examples/jsm/shaders/FXAAShader.js';


const scene = new THREE.Scene();
let width = window.innerWidth;
let height = window.innerHeight;
const camera = new THREE.PerspectiveCamera( 15, width/height, 0.1, 1000 );
//const camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
const renderer = new THREE.WebGLRenderer();
const composer = new EffectComposer(renderer);
const pmremGenerator = new THREE.PMREMGenerator( renderer );
const bloomPass = new UnrealBloomPass( new THREE.Vector2( width, height ));
const fxaaPass = new ShaderPass( FXAAShader );
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );

const controls = new OrbitControls( camera, renderer.domElement );
const stats = new Stats();
const mouse = new THREE.Vector2(100,100);
const rayCaster = new THREE.Raycaster();

const matGround = new THREE.MeshPhysicalMaterial( {color: 0xaaaaaa} );
const geometry = new THREE.BoxGeometry( 7, 0.05, 7 );
const cubeGround = new THREE.Mesh( geometry, matGround );
const currentFov = camera.fov;

let car;

const paramsBloom = {
	exposure: 1.7,
	bloomStrength: 0.17,
	bloomThreshold: 0.1,
	bloomRadius: 1
};

setSystem();
setRenderer();
setCubemap();
setPostprocess();
setLight();
setGUI();
//addTestBox();

function init()
{
	console.log(controls);
	console.log(camera);
	cubeGround.position.set(0,0,0);
	cubeGround.receiveShadow = true;
	//scene.add( cubeGround );
	console.log('before car = load()');
	load("Models/car/scene.gltf", 0,0,0);
	console.log('after car = load()');
	
}


function ctrl()
{

}

function calc()
{
	if(currentFov != camera.fov)
	{
		camera.updateProjectionMatrix();
		currentFov = camera.fov;
	}
	controls.update();
	stats.update();
}

function draw()
{
	requestAnimationFrame( animate );
	//renderer.render( scene, camera );
	composer.render();
}

function destroy()
{
	BufferGeometry.dispose();
	Material.dispose();
	Texture.dispose();
	WebGLRenderTarget.dispose();
}


init();
function animate()
{
	ctrl();
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
			gltf.scene.traverse( function( node ) { // what is the traverse? : called on children
				if ( node.isMesh )
				{
					node.position.set(x,y,z);
					node.castShadow = true;
					node.receiveShadow = true;
				}		
			} );
			scene.add(gltf.scene);
			console.log("load done");
			car = gltf.scene;
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


function setCubemap()
{
	// normal cubemap
	// const path = 'cubemap/';
	// const format = '.png';
	// const urls = [
	// 	path + 'right' + format,
	// 	path + 'left' + format,
	// 	path + 'top' + format,
	// 	path + 'bottom' + format,
	// 	path + 'front' + format,
	// 	path + 'back' + format
	// ];
	
	// let reflectionCube = new THREE.CubeTextureLoader().load( urls );
	// reflectionCube.format = THREE.RGBFormat;
	
	// // Set SkyBox
	scene.background = new THREE.Color( 0xbbbbbb );
	// scene.background = reflectionCube;
	
	// can reflection.
	new RGBELoader()
		.setDataType( THREE.UnsignedByteType)
		.setPath('hdr/')
		.load('royal_esplanade_1k.hdr', function ( texture ) {
			// const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
			const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
//			scene.background = envMap; // skyBox
			scene.environment = envMap;
			texture.dispose();
			pmremGenerator.dispose();

		});
}

function setPostprocess()
{
	const renderPass = new RenderPass( scene, camera );
	composer.addPass( renderPass );
	
	bloomPass.threshold = paramsBloom.bloomThreshold;
	bloomPass.strength = paramsBloom.bloomStrength;
	bloomPass.radius = paramsBloom.bloomRadius;

	composer.addPass( bloomPass );
	
	const fxaaPass = new ShaderPass( FXAAShader );
	const pixelRatio = renderer.getPixelRatio();
	
	fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( width * pixelRatio );
	fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( height * pixelRatio );
	
	composer.addPass( fxaaPass );
}

function setLight()
{
	const dlHelper = new THREE.DirectionalLightHelper( directionalLight, 1 );

	directionalLight.castShadow = true;
	directionalLight.position.set(1,2,2);
	directionalLight.rotation.set(45,0,0);
	directionalLight.shadow.camera.near = 1;
	directionalLight.shadow.camera.far = 100;
	// directionalLight.shadow.mapSize.width = 512;
	// directionalLight.shadow.mapSize.height = 512;
	
	 scene.add( directionalLight );
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
	let opts = {
		printLog : function() { printLog() }
	};
	let gui = new GUI();
	let section2 = gui.addFolder('directionalLight');
	let section3 = gui.addFolder('car');
	let section4 = gui.addFolder('camera');
	let section5 = gui.addFolder('bloom');
	
	section2.add(directionalLight.position, 'x').min(-3).max(300).step(0.1);
	section2.add(directionalLight.position, 'y').min(-3).max(300).step(0.1);
	section2.add(directionalLight.position, 'z').min(-3).max(300).step(0.1);
	section2.add(directionalLight, 'intensity').min(0).max(10).step(0.1);
	section2.open();
	//section3.add(car.position, 'x').min(-3).max(3).step(0.1);
	//section3.open();
	section4.add(camera, 'fov').min(5).max(120).step(5);
	section4.open();
	section5.add(paramsBloom,'exposure').onChange(function(value) {
		renderer.toneMappingExposure = value;
	});
	section5.add(paramsBloom,'bloomStrength').onChange(function(value){
		console.log("!!!");
		bloomPass.threshold = Number(value);
	});
	section5.add(paramsBloom,'bloomThreshold').onChange(function(value){
		bloomPass.strength = Number(value);
	});
	section5.add(paramsBloom,'bloomRadius').onChange(function(value){
		bloomPass.radius = Number(value);
	});
	section5.open();
	gui.close();
	gui.add(opts,'printLog');
	
}

function printLog()
{
	console.log(camera);
	console.log(camera.position);
	console.log(camera.rotation);

	console.log(car);
}

function setSystem()
{
	document.body.appendChild( renderer.domElement );
	document.body.appendChild( stats.dom );

	addEventListener( 'pointermove', onMouseMove, false );
	addEventListener( 'pointerdown', onMouseDown, false );
	addEventListener( 'pointerup', onMouseUp, false );
	addEventListener( 'pointercancel', onMouseCancel, false );
	addEventListener( 'resize', onWindowResize, false );

	onWindowResize();

	camera.position.set(7.34,5.52,5.53);
	camera.rotation.set(-0.72,0.77,0.55);
	camera.zoom = 1;
	camera.updateProjectionMatrix();

	controls.enableDamping =  true;
	controls.dampingFactor = 0.1;
}

function onWindowResize()
{
	const pixelRatio = window.devicePixelRatio;
	width  = window.innerWidth;//  * pixelRatio | 0;
	height = window.innerHeight;// * pixelRatio | 0;
	console.log(width + " / " + height);
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
	composer.setSize(width, height);
	
	//const pixelRatio = renderer.getPixelRatio();

	fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( width * pixelRatio );
	fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( height * pixelRatio );
}

function onMouseMove( event )
{
	// mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	// mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

	// rayCaster.setFromCamera( mouse, camera );

	// let intersects = rayCaster.intersectObjects( scene.children );

	// for ( let i = 0; i < intersects.length; i ++ ) {
	// 	intersects[ i ].object.material.color.set( 0x00ff00 );
	// }
}

function onMouseDown ( event )
{
	// mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	// mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	// rayCaster.setFromCamera( mouse, camera );

	// let intersects = rayCaster.intersectObjects( scene.children );

	// for ( let i = 0; i < intersects.length; i ++ ) {
	// 	intersects[ i ].object.material.color.set( 0xff0000 );
	// }
}

function onMouseUp ( event )
{

	// mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	// mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	// rayCaster.setFromCamera( mouse, camera );

	// let intersects = rayCaster.intersectObjects( scene.children );

	// for ( let i = 0; i < intersects.length; i ++ ) {
	// 	intersects[ i ].object.material.color.set( 0x0000ff );
	// }
}

function onMouseCancel ( event )
{
	console.log("cancel");
}