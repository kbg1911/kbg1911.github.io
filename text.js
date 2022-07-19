import * as THREE			from './three/build/three.module.js';
import { GLTFLoader }		from './three/examples/jsm/loaders/GLTFLoader.js';
import Stats				from './three/examples/jsm/libs/stats.module.js';
import { GUI }				from './three/examples/jsm/libs/dat.gui.module.js';
import { EffectComposer }	from './three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } 		from './three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } 	from './three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RGBELoader }		from './three/examples/jsm/loaders/RGBELoader.js';
import { ShaderPass } 		from './three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } 		from './three/examples/jsm/shaders/FXAAShader.js';
import { FilmPass }			from './three/examples/jsm/postprocessing/FilmPass.js';
import { CSS2DRenderer, CSS2DObject } from './three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from './three/examples/jsm/renderers/CSS3DRenderer.js';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas});
let width = canvas.clientWidth;
let height = canvas.clientHeight;
const camera = new THREE.PerspectiveCamera( 60, width/height, 0.1, 1000 );
const composer = new EffectComposer(renderer);
const scene = new THREE.Scene();
const pmremGenerator = new THREE.PMREMGenerator( renderer );
const bloomPass = new UnrealBloomPass( new THREE.Vector2( width, height ));
const fxaaPass = new ShaderPass( FXAAShader );
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
const cameraPivot = new THREE.Object3D();
const css2DRenderer = new CSS2DRenderer();
const css3DRenderer = new CSS3DRenderer();

const stats = new Stats();
const mouse = new THREE.Vector2(100,100);
const rayCaster = new THREE.Raycaster();
const currentFov = camera.fov;

const paramsBloom = {
	exposure: 1.29,
	bloomStrength: 0.53,
	bloomThreshold: 0.60,
	bloomRadius: 1
};


function init()
{
	// load("Models/interior/scene.gltf", 0,0,2);

	addText2D('label', 'This is 한글 (2D Renderer)', new THREE.Vector3(0.10,0.15,1.83));
	addText3D('label3D', "POWER", new THREE.Vector3(-0.30,0.05,1.83));
	addDiv3D('labelDiv3D', new THREE.Vector3(0.70,0.05,1.83));


}

function addText3D(divClassName, text, position)
{
	const textDiv = document.createElement( 'div' );
	textDiv.className = divClassName;
	textDiv.textContent = text;
	textDiv.style.display = 'none';
	console.log(textDiv);
	const textLabel = new CSS3DObject( textDiv );
	textLabel.position.set(position.x,position.y,position.z);
	textLabel.scale.set(0.01,0.01,0.01);
	textLabel.lookAt(cameraPivot.position);

	scene.add( textLabel );
}

function addDiv3D(divClassName, position)
{
	const textDiv = document.createElement( 'div' );
	textDiv.className = divClassName;
	textDiv.style.display = 'none';
	console.log(textDiv);
	const textLabel = new CSS3DObject( textDiv );
	textLabel.position.set(position.x,position.y,position.z);
	textLabel.scale.set(0.001,0.001,0.001);
	textLabel.lookAt(cameraPivot.position);

	const iframe = document.createElement( 'iframe' );
	iframe.style.width = '720px';
	iframe.style.height = '1280px';
	iframe.style.border = '0px';
	iframe.src = [ 'http://leezm.co.kr', '', '?rel=0' ].join( '' );
	textDiv.appendChild( iframe );

	scene.add( textLabel );
}



function addText2D(divClassName, text, position)
{
	const textDiv = document.createElement( 'div' );
	textDiv.className = divClassName;
	textDiv.textContent = text;
	textDiv.style.display = 'none';
	const textLabel = new CSS2DObject( textDiv );
	textLabel.position.set(position.x,position.y,position.z);


	
	scene.add( textLabel );
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
				console.log(cameraPivot.position);
				console.log(camera.rotation.x);
				console.log(cameraPivot.rotation.y);
				break;
				case 'a':
					cameraPivot.position.x -= 0.1;
					break;
				case 'd':
					cameraPivot.position.x += 0.1;
					break;
				case 's':
					cameraPivot.position.z += 0.1;
					break;
				case 'w':
					cameraPivot.position.z -= 0.1;
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
	
	stats.update();
}

function draw()
{
	requestAnimationFrame( animate );
	composer.render();
	css3DRenderer.render( scene, camera );
	css2DRenderer.render( scene, camera );
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
	document.body.appendChild( stats.dom );
	
	css3DRenderer.domElement.addEventListener( 'resize', onWindowResize,	false );
	css3DRenderer.domElement.addEventListener( 'pointermove',	ctrl,	false );
	css3DRenderer.domElement.addEventListener( 'pointerdown',	ctrl,	false );
	css3DRenderer.domElement.addEventListener( 'pointerup',		ctrl,	false );
	addEventListener( 'keydown',		ctrl,	false );
	addEventListener( 'keyup',			ctrl,	false );

	onWindowResize();

	cameraPivot.position.set(-0.60,0.15,0.53);
	camera.rotation.set(-0.013,0,0);
	cameraPivot.rotation.set(0,-2.855,0);
	cameraPivot.add(camera);
	scene.add(cameraPivot);
	currentRot.set(camera.rotation.x,cameraPivot.rotation.y,0);


	css2DRenderer.setSize( width, height );
	css2DRenderer.domElement.style.position = 'absolute';
	css2DRenderer.domElement.style.left = canvas.getBoundingClientRect().x + scrollX +'px';
	css2DRenderer.domElement.style.top = canvas.getBoundingClientRect().y + scrollY +'px';
	
	
	css3DRenderer.setSize( width, height );
	css3DRenderer.domElement.style.position = 'absolute';
	css3DRenderer.domElement.style.left = canvas.getBoundingClientRect().x + scrollX +'px';
	css3DRenderer.domElement.style.top = canvas.getBoundingClientRect().y + scrollY +'px';


	// 뭐든 이벤트가 가장 올라와있는걸 늦게 추가.
	document.body.appendChild( css2DRenderer.domElement ); 
	document.body.appendChild( css3DRenderer.domElement );

    
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
	// composer.addPass(filmPass);
	
	composer.addPass( fxaaPass );
	composer.addPass( bloomPass );
}

function setLight()
{
	const dlHelper = new THREE.DirectionalLightHelper( directionalLight, 1 );
	
	directionalLight.castShadow = true;
	directionalLight.position.set(1,2,2);
	directionalLight.rotation.set(45,0,0);
	directionalLight.shadow.camera.near = 0.01;
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
	let section = gui.addFolder('v2');
	let section5 = gui.addFolder('bloom');
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
	console.log(width + " / " + height);
	camera.aspect = width / height;
	renderer.setSize(width, height);
	composer.setSize(width, height);
	camera.updateProjectionMatrix();

	css2DRenderer.setSize(width, height);
	// css2DRenderer.aspect = width/ height;
	css3DRenderer.setSize(width, height);
	//const pixelRatio = renderer.getPixelRatio();

	fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( width * pixelRatio );
	fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( height * pixelRatio );
}