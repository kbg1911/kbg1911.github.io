import * as u               from './utils/utils.js';
import * as THREE			from './three/build/three.module.js';
import { SkeletonUtils }    from './three/examples/jsm/utils/SkeletonUtils.js';
import { Vector3 } from './three/src/Three.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';

function starter()
{
    const clock = new THREE.Clock();
    const mixers = [];
    
    const models = {
        cube1:  {url:'models/blender/cube/cube.gltf'},
        cube2:  {url:'models/blender/cube/cube.gltf'},
        cube3:  {url:'models/blender/cube/cube.gltf'},
    };
    
    const manager = new THREE.LoadingManager();
    manager.onLoad = init;
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        console.log(itemsLoaded / itemsTotal * 100 | 0);
    }
    {
        const gltfLoader = new GLTFLoader(manager);
        for (const model of Object.values(models))
        {
            gltfLoader.load(model.url, (gltf) => {
                model.gltf = gltf;
            });
        }
    }
    
    function init()
    {
    
    }
    
    // u.init();
    // u.load(models);
    // u.getManager().onLoad = init;
    
    
    
    const globals = {
        time: 0,
        deltaTime: 0,
    };
    
    class SafeArray
    {
        constructor()
        {
            this.array = [];
            this.addQueue = [];
            this.removeQueue = new Set();
        }
    
        get isEmpty()
        {
            return this.addQueue.length + this.array.length > 0;
        }
    
        add(element)
        {
            this.addQueue.push(element);
        }
    
        remove(element)
        {
            this.removeQueue.add(element);
        }
    
        forEach(fn)
        {
            this._addQueued();
            this._removeQueued();
            for(const element of this.array)
            {
                if(this.removeQueue.has(element))
                {
                    continue;
                }
                fn(element);
            }
        }
        _addQueued()
        {
            if(this.addQueue.length)
            {
                this.array.splice(this.array.length, 0, ...this.addQueue);
                this.addQueue = [];
            }
        }
        _removeQueued()
        {
            if(this.removeQueue.size)
            {
                this.array = this.array.filter(element => !this.removeQueue.has(element));
                this.removeQueue.clear();
            }
        }
    }
    
    
    function removeArrayElement(array, element)
    {
        const ndx = array.indexOf(element);
        if(ndx >= 0)
        {
            array.splice(ndx,1);
        }
    }
    
    class GameObject
    {
        constructor(parent, name)
        {
            this.name = name;
            this.components = [];
            this.transform = new THREE.Object3D();
            parent.add(this.transform);
        }
    
        addComponent(ComponentType, ...args)
        {
            const component = new ComponentType(this, ...args);
            this.components.push(component);
            return component;
        }
    
        removeComponent(component)
        {
            removeArrayElement(this.components, component);
        }
    
        getComponent(ComponentType)
        {
            return this.componenets.find(c => c instanceof ComponentType);
        }
    
        update()
        {
            for(const component of this.components)
            {
                component.update();
            }
        }
    }
    
    class Component
    {
        constructor(gameObject)
        {
            this.gameObject = gameObject;
        }
    
        update()
        {
    
        }
    
    }
    
    
    
    class GameObjectManager
    {
        constructor()
        {
            this.gameObjects = new SafeArray();
        }
        createGameObject(parent, name)
        {
            const gameObject = new GameObject(parent, name);
            this.gameObjects.add(gameObject);
            return gameObject;
        }
        removeGameObject(gameObject)
        {
            this.gameObjects.remove(gameObject);
        }
        update()
        {
            this.gameObjects.forEach(gameObject => gameObject.update());
        }
    }
    
    class SkinInstance extends Component {
        constructor(gameObject, model)
        {
            super(gameObject)
            this.model = model;
    
            this.animRoot = SkeletonUtils.clone(this.model.gltf.scene);
            this.mixer = new THREE.AnimationMixer(this.animRoot);
            gameObject.transform.add(this.animRoot);
            this.action = {};
        }
        setAnimation(animName)
        {
            const clip = this.model.animations[animName];
            console.log(this.action);
            // for(const action of Object.values(this.actions))
            // {
            //     console.log(action);
            //     action.enabled = false;
            // }
    
            // const action = this.mixer.clipAction(clip);
            // action.enabled = true;
            // action.reset();
            // action.play();
            // this.ations[animName] = action;
    
        }
        update()
        {
            this.mixer.update(globals.deltaTime);
        }
    }
    
    class Player extends Component
    {
        constructor(gameObject) {
            super(gameObject);
            const model = models.cube1;
            console.log(model.animations);
            this.skinInstance = gameObject.addComponent(SkinInstance, model);
            this.skinInstance.setAnimation('Move');
        }
    }
    
    const scene = u.getScene();
    const gameObjectManager = new GameObjectManager();
    
    function animate()
    {
        u.getCamera().position.y = window.scrollY/100;
    
        const delta = Math.min(clock.getDelta(), 1/20); // Anti Frame Over
        globals.deltaTime = delta;
        for(const mixer of mixers) {
            mixer.update(delta);
        }
        // console.log(models.cube1.pos);
        // models.cube1.gltf.scene.position.x += 0.01;
        // console.log(models.cube1.gltf.scene.position.x);
        gameObjectManager.update();
        u.render();
        requestAnimationFrame( animate );
    }
    
    
    function prepModelsAndAnimation() {
        Object.values(models).forEach((model, ndx) => {
            const clonedScene = SkeletonUtils.clone(model.gltf.scene);
            const root = new THREE.Object3D();
            root.add(clonedScene);
            u.addScene(root);
    
            const mixer = new THREE.AnimationMixer(clonedScene);
            const firstClip = Object.values(model.animations)[0];
            const action = mixer.clipAction(firstClip);
            action.play();
            mixers.push(mixer);
        });
    }
    
    // function init()
    // {
    //     console.log('loadFinish and Init');
    //     prepModelsAndAnimation();
    
    //     const gameObject = gameObjectManager.createGameObject(u.getScene(), 'player');
    //     gameObject.addComponent(Player);
    //     gameObject.transform.position.set(new Vector3(0,0,0));
        
    
    //     u.add2DText('<a href="http://leezm.co.kr">LEEZM</a><br>Allowed Tags', new THREE.Vector3(2,8,0), '1rem');
    //     u.add2DText('This is CSS2D Fit Text', new THREE.Vector3( 0,6,0), '1rem', 'rgb(255,0,0');
    //     u.add2DText('This is CSS2D Fit Text', new THREE.Vector3(-2,0,0), '1rem');
    //     u.add2DText('Back Text', new THREE.Vector3(2,8,-5), '0.5rem');
    //     u.add2DText('Back Text', new THREE.Vector3(2,6,-5), '0.5rem');
    //     u.add2DText('Back Text', new THREE.Vector3(-2,0,-5), '0.5rem');
    
    //     u.add2DButton('ButtonCustomTest', new THREE.Vector3(-5,5,0), '150px','50px', custFunc);
    //     u.add2DButton('ButtonTest', new THREE.Vector3(0,0,0), '100px','50px', function() { alert("am i Work?") });
    
    //     animate();
    // }
    
    function custFunc()
    {
        alert("custFunc Work!")
    }
    
    ///////////////////////////////////////////////////////////////////////////////
}
starter();
