import * as THREE			from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { GLTFLoader }		from 'https://unpkg.com/three@0.124.0/examples/jsm/loaders/GLTFLoader.js';
import Stats				from 'https://unpkg.com/three@0.124.0/examples/jsm/libs/stats.module.js';
import { GUI }				from 'https://unpkg.com/three@0.124.0/examples/jsm/libs/dat.gui.module.js';
import { EffectComposer }	from 'https://unpkg.com/three@0.124.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } 		from 'https://unpkg.com/three@0.124.0/examples/jsm/postprocessing/RenderPass.js';
import { RGBELoader }		from 'https://unpkg.com/three@0.124.0/examples/jsm/loaders/RGBELoader.js';
import { ShaderPass } 		from 'https://unpkg.com/three@0.124.0/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } 		from 'https://unpkg.com/three@0.124.0/examples/jsm/shaders/FXAAShader.js';
import { FilmPass }			from 'https://unpkg.com/three@0.124.0/examples/jsm/postprocessing/FilmPass.js';
import { FBXLoader }         from 'https://unpkg.com/three@0.124.0/examples/jsm/loaders/FBXLoader.js';


const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas, alpha:true});
let width = canvas.clientWidth;
let height = canvas.clientHeight;
const camera = new THREE.PerspectiveCamera( 60, width/height, 1, 1000 );
const composer = new EffectComposer(renderer);
const scene = new THREE.Scene();
const pmremGenerator = new THREE.PMREMGenerator( renderer );
const fxaaPass = new ShaderPass( FXAAShader );
// const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
const cameraPivot = new THREE.Object3D();

const stats = new Stats();
const mouse = new THREE.Vector2(100,100);
const rayCaster = new THREE.Raycaster();

const clock = new THREE.Clock();

// const controls = new TrackballControls( camera, renderer.domElement ); 



function init()
{
	load("Models/fantasy_book/scene.gltf", 0,0,2);
	console.log(renderer);
	// loadFbx("Models/fantasy_book_fbx/source/TEST2.fbx", 0,0,2);
	
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
	// event.stopPropagation();
	// event.preventDefault();

	if(eventType == "pointerdown")
	{
		// console.log('down');
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
		// console.log('up');
	}

	if(eventType == "pointermove" && isDown || eventType == "touchmove")
	{
		// console.log('draging');
		console.log(event);
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
		
		currentPos.x = mouse.x;
		currentPos.y = mouse.y;

		diffPos.x = (currentPos.x - startPos.x);
		diffPos.y = (currentPos.y - startPos.y);

		if(event.buttons == 1)
		{
			camera.rotation.x = currentRot.x + diffPos.y;
			cameraPivot.rotation.y = currentRot.y + -diffPos.x;
		}
		else if(event.buttons == 2)
		{
			let speed = 0.5;
			const direction = new THREE.Vector3;
			camera.getWorldDirection(direction);

			// cameraPivot.position.x += direction.z * diffPos.x;
			// cameraPivot.position.y += direction.y * diffPos.y;
			// cameraPivot.position.z -= direction.x * diffPos.x;
		}

	}


    let speed = 0.5;
    const direction = new THREE.Vector3;
    camera.getWorldDirection(direction);
    const right = new THREE.Vector3(1,0,0);
	if(event.type == 'keydown')
	{
        let key = event.key;
        if(key == 'q')
        {
		}
        if(key == 'w')
        {
			cameraPivot.position.addScaledVector(direction, speed);
        }
        if(key == 's')
        {
			cameraPivot.position.addScaledVector(direction, -speed);
        }
        if(key == 'a')
        {
			cameraPivot.position.x += direction.z * speed;
			cameraPivot.position.z -= direction.x * speed;
        }
        
        if(key == 'd')
        {
			cameraPivot.position.x -= direction.z * speed;
			cameraPivot.position.z += direction.x * speed;
        }
	}
}

function calc()
{
	// stats.update();
    // controls.update();
}

function draw()
{
    requestAnimationFrame( animate );
    
    // console.log(mixer);
    if(mixer)
    {
        const delta = clock.getDelta();
        mixer.update(delta);
    }
        
    // console.log(mixer);

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
// setGUI();

init();
function animate()
{
	calc();
	draw();
}
// animate();


let mixer;
// functions.
function load(path, x, y, z)
{
	console.log("load start");
	let loader = new GLTFLoader();

	loader.load(
		path,
		function (gltf) {
			console.log('gltf');
			console.log(gltf);
			gltf.scene.position.set(x,y,z);

            gltf.scene.traverse( function( node ) { // what is the traverse? : called on children
				console.log('node');
				console.log(node);
                if ( node.isMesh )
                {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
			} );
			
			const mesh = gltf.scene.children[ 0 ];
			scene.add( mesh );
			mixer = new THREE.AnimationMixer(mesh);
			mixer.clipAction(gltf.animations[0]).play();
			console.log(mixer);
			
			scene.add(gltf.scene);
			console.log("load done");
			
            animate();

			
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

function loadFbx(path) {
    const loader = new FBXLoader();
    loader.load( path, function ( object ) {
        mixer = new THREE.AnimationMixer( object );

        const action = mixer.clipAction( object.animations[ 0 ] );
        console.log(action);
        action.play();

        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        scene.add( object );
        animate();
    } );
}

function setSystem()
{
	// document.body.appendChild( stats.dom );
	
	canvas.addEventListener( 'resize', onWindowResize,	false );
	canvas.addEventListener( 'pointermove',	ctrl,	false );
	canvas.addEventListener( 'pointerdown',	ctrl,	false );
	canvas.addEventListener( 'pointerup',		ctrl,	false );
	addEventListener( 'keydown',		ctrl,	false );
	addEventListener( 'keyup',			ctrl,	false );

	onWindowResize();

	cameraPivot.position.set(0,28,60);
	camera.rotation.set(-0.58,0,0);
	cameraPivot.rotation.set(0,0.026,0);
	cameraPivot.add(camera);
	scene.add(cameraPivot);
	currentRot.set(camera.rotation.x,cameraPivot.rotation.y,0);
	
	
    
    // controls.rotateSpeed = 1.0;
    // controls.zoomSpeed = 1.2;
    // controls.panSpeed = 0.8;

    // controls.keys = [ 65, 83, 68 ];
}


function setEnvironment()
{
	// scene.background = new THREE.Color( 0xbbbbbb ); // basic background
	
	new RGBELoader()
		.setDataType( THREE.UnsignedByteType)
		.setPath('hdr/')
		.load('immenstadter_horn_1k.hdr', function ( texture ) {
			const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
			//scene.background = envMap; // skyBox
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

	
	const filmPass = new FilmPass(
		0.65,   // noise intensity
		0.025,  // scanline intensity
		648,    // scanline count
		false,  // grayscale
	);
	filmPass.renderToScreen = true;
	// composer.addPass(filmPass);
	
	composer.addPass( fxaaPass );
}

function setLight()
{
	// const dlHelper = new THREE.DirectionalLightHelper( directionalLight, 1 );
	
	// directionalLight.castShadow = true;
	// directionalLight.position.set(0,3,-3);
	
    // directionalLight.lookAt(cameraPivot.position);
    
    
    const pl = new THREE.PointLight(0xffffff,1,50,0);
    pl.castShadow = true;
	pl.position.set(7,50,-10);
	pl.bias = -0.00001;
	const plhp = new THREE.PointLightHelper(pl,2,0xff0000);

    scene.add(pl);
    scene.add(plhp);
	
	scene.add(new THREE.CameraHelper(pl.shadow.camera));

	// scene.add( directionalLight );
	// scene.add( dlHelper );

	const amLight = new THREE.AmbientLight( 0xFFFFFF, 1 );
	scene.add(amLight);

}

function setRenderer()
{
	renderer.antialias = true;
	renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
	// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	// renderer.shadowMap.type = THREE.BasicShadowMap;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	renderer.toneMappingExposure = 1;
	// renderer.physicallyCorrectLights = renderer.physicallyCorrectLights;
}

function setGUI()
{
	let gui = new GUI();
	let section = gui.addFolder('v2');
	
	gui.open();
	
}


function onWindowResize()
{
	const pixelRatio = window.devicePixelRatio;
	console.log(width + " / " + height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
	composer.setSize(width, height);

	fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( width * pixelRatio );
    fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( height * pixelRatio );
}