import * as THREE                       from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { CSS2DRenderer, CSS2DObject }   from 'https://unpkg.com/three@0.124.0/examples/jsm/renderers/CSS2DRenderer.js';
import { EffectComposer }	from 'https://unpkg.com/three@0.124.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass }       from 'https://unpkg.com/three@0.124.0/examples/jsm/postprocessing/RenderPass.js';
import { RGBELoader }		from 'https://unpkg.com/three@0.124.0/examples/jsm/loaders/RGBELoader.js';
import { ShaderPass } 		from 'https://unpkg.com/three@0.124.0/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } 		from 'https://unpkg.com/three@0.124.0/examples/jsm/shaders/FXAAShader.js';
import Stats				from 'https://unpkg.com/three@0.124.0/examples/jsm/libs/stats.module.js';
import { GUI }				from 'https://unpkg.com/three@0.124.0/examples/jsm/libs/dat.gui.module.js';
import { GLTFLoader }       from '../three/examples/jsm/loaders/GLTFLoader.js';
import { Vector3 } from '../three/build/three.module.js';


const isDebug = false;
const css2DRenderer = new CSS2DRenderer();
const scene = new THREE.Scene();
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas, alpha:true});
const composer = new EffectComposer(renderer);
const pmremGenerator = new THREE.PMREMGenerator( renderer );
const width = canvas.clientWidth;
const height = canvas.clientHeight;
const camera = new THREE.PerspectiveCamera( 60, width/height, 1, 1000 );
const cameraPivot = new THREE.Object3D();

const fxaaPass = new ShaderPass( FXAAShader );
const stats = new Stats();


export function addScene(object)
{
    scene.add(object);
}

export function getRenderer() {
    return renderer;
}


export function add2DText(text, position, fontSize, color)
{
    const textDiv = document.createElement( 'div' );
    textDiv.className = 'divText2D';
    textDiv.innerHTML = text;
    textDiv.style.display = 'none';
    textDiv.style.fontSize = fontSize;
    textDiv.style.color = color;
    
    const textLabel = new CSS2DObject( textDiv );
    textLabel.position.set(position.x,position.y,position.z);
    
    scene.add( textLabel );
}

export function add2DButton(text, position, width, height, func)
{
    const buttonDiv = document.createElement( 'button' );
    buttonDiv.className = 'divButton2D';
    buttonDiv.innerHTML = text;
    buttonDiv.style.display = 'none';
    buttonDiv.style.width = width;
    buttonDiv.style.height = height;

    buttonDiv.style.color = 'rgb(0,0,0)';
    

    buttonDiv.addEventListener('click',function() {
        func();
    });

    const css2dObj = new CSS2DObject( buttonDiv );
    css2dObj.position.set(position.x,position.y,position.z);
    

    scene.add( css2dObj );
    
    return css2dObj;
}

const manager = new THREE.LoadingManager();
manager.onProgress = function (url,itemsLoaded, itemsTotal) {
    console.log(itemsLoaded / itemsTotal * 100 | 0);
}

export function getManager() { return manager };
export function getScene() { return scene };


export function load(models)
{
    const gltfLoader = new GLTFLoader(manager);
    for(const model of Object.values(models))
    {
        gltfLoader.load(model.url, (gltf) => {
            model.gltf = gltf;
            console.log(model.gltf.scene.position);
            model.gltf.scene.position.set(-2,5,0);
            const animsByName = {};
            model.gltf.animations.forEach((clip)=>{
                animsByName[clip.name] = clip;
            });
            
            model.animations = animsByName;
        });

        
    }
    
}

export function init()
{
    console.log(width + ' / ' + height);
    
    css2DRenderer.setSize( width, height );
    css2DRenderer.domElement.style.position = 'absolute';
    css2DRenderer.domElement.style.left = canvas.getBoundingClientRect().x + scrollX +'px';
    css2DRenderer.domElement.style.top = canvas.getBoundingClientRect().y + scrollY +'px';
    
    document.body.appendChild( css2DRenderer.domElement ); 

    setSystem();
    setRenderer();
    setEnvironment();
    setPostprocess();
    setLight();
    setGUI();
    onWindowResize();
}

export function render()
{
    if(isDebug) stats.update();
    composer.render();
    css2DRenderer.render( scene, camera );
}

export function onWindowResize()
{
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    composer.setSize(width, height);
    renderer.setSize(width, height, false);
    css2DRenderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    // console.log('onWindowResize()' + canvas.width + '/' + canvas.height);

    const pixelRatio = renderer.getPixelRatio(); // always 1, but its better then camera.aspect.
    fxaaPass.material.uniforms[ 'resolution' ].value.x = (1 / ( width * pixelRatio )) * 0.5; // *0.5 is better.
    fxaaPass.material.uniforms[ 'resolution' ].value.y = (1 / ( height * pixelRatio ))* 0.5;
}


function ctrl()
{
    console.log('down');
}

export function getCamera() { return camera; }
export function getCameraPivot() { return cameraPivot; }

export function setSystem() 
{
    if(isDebug) document.body.appendChild( stats.dom );

    addEventListener( 'resize',      onWindowResize,	false );
    
    // this.canvas.addEventListener( 'pointermove',	this.ctrl,	false );
    css2DRenderer.domElement.addEventListener( 'pointerdown',	ctrl,	false );
    // this.canvas.addEventListener( 'pointerup',	this.ctrl,	false );
    // addEventListener( 'scroll',	        	this.ctrl,	false );
    // addEventListener( 'keydown',	    	this.ctrl,	false );
    // addEventListener( 'keyup',		    	this.ctrl,	false );

    cameraPivot.position.set(0,0,0);
    camera.position.set(0,0,20);
    camera.rotation.set(0,0,0);
    cameraPivot.rotation.set(0,0,0);
    cameraPivot.add(camera);
    scene.add(cameraPivot);
}


function setRenderer()
{
    renderer.antialias = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.VSMShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
}

function setEnvironment()
{
    //scene.background = new THREE.Color( 0x555555 ); // basic background
    
    console.log(pmremGenerator);
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
    composer.addPass( fxaaPass );

}

function setLight()
{
    const pl = new THREE.PointLight(0xff0000,5,100,0);
    pl.castShadow = true;
	pl.position.set(0,10,0);
	pl.bias = -0.00001;
	const plhp = new THREE.PointLightHelper(pl,1,0xff0000);

    scene.add(pl);
    scene.add(plhp);
	
	// scene.add(new THREE.CameraHelper(pl.shadow.camera));

	const amLight = new THREE.AmbientLight( 0xFFFFFF, 1 );
	scene.add(amLight);
}

function setGUI()
{
	// let gui = new GUI();
	// let section = gui.addFolder('v2');
	
	// gui.open();
}

function destroy()
{
	BufferGeometry.dispose();
	Material.dispose();
	Texture.dispose();
	WebGLRenderTarget.dispose();
}