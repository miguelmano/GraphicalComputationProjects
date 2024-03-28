


//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var camera,pointLight;
var renderer;
var scene ;
var clock;
var n = 0;
var skyGeo,dome;
var sky,field;
var lightFlag=true;
var ground;
var skydome;
var moonLight;
var flowerFlag = true;
var starFlag = true;
var camera1,camera2;
var bodyMesh,cockpitMesh,bottomMesh,moonMesh;
var spheresMesh=[];
var leavesMeshes = [];
var trunks = [];
var roofMesh;
var houseMesh;
var splitterMesh;
var chimneyMesh;
var doorMesh;
var frontWindowMesh;
var sideWindowMesh;
var ovni, spheres;
var ovniXMovementDirection, ovniZMovementDirection;
const ovniAngularVelocity = 0.3, ovniVelocityCap = 15;


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    scene = new THREE.Scene();
    scene.add(new THREE.AxisHelper(10));
   
    ovni = createOvni(20,65,-80);
	scene.add(ovni);
    scene.add(createMoon(-100,100,-100));
    scene.add(createAmbientLight());
    
    ground = createTerrain();
    scene.add(ground);
   

    skydome = createSkydome();
    scene.add(skydome);
    scene.add(createHouse(-10,25,10));

    scene.add(createSobrero(20,25,-5, 2,0));
		scene.add(createSobrero(50,25,15, 2.2, Math.PI/3));
		scene.add(createSobrero(-60,25,30, 2.5, Math.PI/4));
		scene.add(createSobrero(-30,25,15, 1.7, 0));
		scene.add(createSobrero(-40,25,5, 1.5, 0));
        scene.add(createSobrero(70,25,-100, 4.7, 0));
		scene.add(createSobrero(-40,25,-35, 0.5, 0));
	
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera1.position.x = 70;
    camera1.position.y = 80;
    camera1.position.z = 110;
    camera1.lookAt(scene.position);
    scene.add( camera1 );
}



/////////////////////
/* CREATE LIGHT(S) */
/////////////////////
function createLight(){
        pointLight = new THREE.DirectionalLight(0xFFFFFF);
        pointLight.intensity = 2.6;
        pointLight.castShadow = true ;
        return pointLight;
}
function lightSwitch(){
    if (lightFlag==true){
        moonLight.visible = false;
        lightFlag=false;
    }else{
        moonLight.visible = true;
        lightFlag=true;
    }
}
function createAmbientLight(){
    const light = new THREE.AmbientLight( 0xf0c420, 0.7 ); // soft white light
    return light
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function lambertMaterials(){
    bodyMesh.material = new THREE.MeshLambertMaterial({color: 0xdddddd});
    cockpitMesh.material = new THREE.MeshLambertMaterial({color: 0x52B2BF});
    bottomMesh.material = new THREE.MeshLambertMaterial({color: 0xDBAC34});
    for (let i = 0; i<12 ; i++){
        spheresMesh[i].material = new THREE.MeshLambertMaterial({color: 0xfdfdfd});
    }
    
    moonMesh.material = new THREE.MeshLambertMaterial( {color: 0xf0c420,emissive:0xf0c420});
    for (let i = 0; i < leavesMeshes.length; i++) {
        leavesMeshes[i].material = new THREE.MeshLambertMaterial({color: 0x008e00});
    }
    for (let i = 0; i < trunks.length; i++) {
        trunks[i].material = new THREE.MeshLambertMaterial({color: 0x8B4513});
    }
    
    houseMesh.material = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
    splitterMesh.material = houseMesh.material;
    chimneyMesh.material = houseMesh.material;
    doorMesh.material = new THREE.MeshLambertMaterial({color: 0xeedddd, wireframe: false});
    roofMesh.material = new THREE.MeshLambertMaterial({color: 0xdc9999, wireframe: false});
    frontWindowMesh.material = new THREE.MeshLambertMaterial({color: 0x0000ff, wireframe: false});
    sideWindowMesh.material = frontWindowMesh.material;
}

function phongMaterials(){
    bodyMesh.material = new THREE.MeshPhongMaterial({color: 0xdddddd});
    cockpitMesh.material =  new THREE.MeshPhongMaterial({color: 0x52B2BF});
    bottomMesh.material = new THREE.MeshPhongMaterial({color: 0xDBAC34});
    for (let i = 0; i<12 ; i++){
        spheresMesh[i].material= new THREE.MeshPhongMaterial({color: 0xfdfdfd});
    }
    
    moonMesh.material = new THREE.MeshPhongMaterial( {color: 0xf0c420 , shininess: 20 ,emissive:0xf0c420});
    for (let i = 0; i < leavesMeshes.length; i++) {
        leavesMeshes[i].material = new THREE.MeshPhongMaterial({color: 0x008e00});
    }
    for (let i = 0; i < trunks.length; i++) {
        trunks[i].material = new THREE.MeshPhongMaterial({color: 0x8B4513});
    }
    
    houseMesh.material = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: false});
    splitterMesh.material = houseMesh.material;
    chimneyMesh.material = houseMesh.material;
    doorMesh.material = new THREE.MeshPhongMaterial({color: 0xeedddd, wireframe: false});
    roofMesh.material = new THREE.MeshPhongMaterial({color: 0xdc9999, wireframe: false});
    frontWindowMesh.material = new THREE.MeshPhongMaterial({color: 0x0000ff, wireframe: false});
    sideWindowMesh.material = frontWindowMesh.material;
    
}

function toonMaterials(){
    bodyMesh.material = new THREE.MeshToonMaterial({color: 0xdddddd});
    cockpitMesh.material =  new THREE.MeshToonMaterial({color: 0x52B2BF});
    bottomMesh.material = new THREE.MeshToonMaterial({color: 0xDBAC34});
    for (let i = 0; i<12 ; i++){
        spheresMesh[i].material= new THREE.MeshToonMaterial({color: 0xfdfdfd});
    }
    
    moonMesh.material = new THREE.MeshToonMaterial( {color: 0xf0c420,emissive:0xf0c420})
    for (let i = 0; i < leavesMeshes.length; i++) {
        leavesMeshes[i].material = new THREE.MeshToonMaterial({color: 0x008e00});
    }
    for (let i = 0; i < trunks.length; i++) {
        trunks[i].material = new THREE.MeshToonMaterial({color: 0x8B4513});
    }
    
    houseMesh.material = new THREE.MeshToonMaterial({color: 0xffffff, wireframe: false});
    splitterMesh.material = houseMesh.material;
    chimneyMesh.material = houseMesh.material;
    doorMesh.material = new THREE.MeshToonMaterial({color: 0xeedddd, wireframe: false});
    roofMesh.material = new THREE.MeshToonMaterial({color: 0xdc9999, wireframe: false});
    frontWindowMesh.material = new THREE.MeshToonMaterial({color: 0x0000ff, wireframe: false});
    sideWindowMesh.material = frontWindowMesh.material;
}

function basicMaterials(){
    bodyMesh.material = new THREE.MeshBasicMaterial({color: 0xdddddd});
    cockpitMesh.material =  new THREE.MeshBasicMaterial({color: 0x52B2BF});
    bottomMesh.material = new THREE.MeshBasicMaterial({color: 0xDBAC34});
    for (let i = 0; i<12 ; i++){
        spheresMesh[i].material= new THREE.MeshBasicMaterial({color: 0xfdfdfd});
    }
    
    moonMesh.material = new THREE.MeshBasicMaterial( {color: 0xf0c420})

}

function generateFlowers() {
    const plane = document.createElement('canvas');
    const context = plane.getContext('2d');
    plane.width = 500;
    plane.height = 500;
    

    context.fillStyle = '#074a0f';
    context.fillRect(0, 0, plane.width, plane.height); // preenche o fundo
    
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * plane.width;
      const y = Math.random() * plane.height;
      const randomColor = Math.floor(Math.random() * 4); // Escolher uma cor aleatória
      switch (randomColor) {
          case 0:
          c = '#ffffff'; // Branco
          break;
          case 1:
          c='#ffff00'; // Amarelo
          break;
          case 2:
          c='#c8a2c8'; // Lilás
          break;
          case 3:
          c='#add8e6'; // Azul-claro
          break;
          default:
          c='#ffffff'; // Branco 
        }
      context.beginPath();
      context.arc(x, y, 0.5, 0, 4 * Math.PI);
      context.fillStyle = c;
      context.fill();
    }
    
    const texture = new THREE.CanvasTexture(plane);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  
}
function flowerSwitch(){
    if (flowerFlag == true ){
    
        var texture = new THREE.TextureLoader().load('textures/heightmap.png');
        // config material
        const material = new THREE.MeshPhongMaterial({
        color: 0x031405,
        wireframe: false,
        displacementMap: texture,
        displacementScale: 100
        });

        ground.material = material;
        flowerFlag = false;
    }
    else{
        var flowers= generateFlowers();
        var texture = new THREE.TextureLoader().load('textures/heightmap.png');
        // config material
        const material = new THREE.MeshPhongMaterial({
        color: 0x074a0f,
        wireframe: false,
        map: flowers,
        displacementMap: texture,
        displacementScale: 100
        });

        ground.material = material;
        flowerFlag = true;
    }
}
function starSwitch(){
    if (starFlag == true){
        var stars = generateSky0Stars();
        const material = new THREE.MeshPhongMaterial({
            wireframe: false,
            map: stars,
        });
        skydome.material=material;
        skydome.material.side = THREE.BackSide; 
        starFlag = false;
    }else{
        var stars = generateSky();
        const material = new THREE.MeshPhongMaterial({
            wireframe: false,
            map: stars,
        });
    
        skydome.material=material;
        skydome.material.side = THREE.BackSide; 
        starFlag = true ;
    }
}
function generateSky0Stars() {
	var size = 250;
	plane = document.createElement( 'canvas' );
	plane.width = size;
	plane.height = size;
	var context = plane.getContext( '2d' );

	context.rect( 0, 0, size, size );
	var fade = context.createLinearGradient( 0, 0, size, size ); 
	fade.addColorStop(0, '#390461'); // violeta escuro
	fade.addColorStop(1, '#01054f'); // azul escuro  
	context.fillStyle = fade;  // draw fade
	context.fillRect(0, 0, plane.width, plane.height);
    const texture = new THREE.CanvasTexture(plane);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
	return texture;

}

function generateSky() {
	var size = 250;
	plane = document.createElement( 'canvas' );
	plane.width = size;
	plane.height = size;
	var context = plane.getContext( '2d' );

	context.rect( 0, 0, size, size );
	var fade = context.createLinearGradient( 0, 0, size, size ); 
	fade.addColorStop(0, '#390461'); // violeta escuro
	fade.addColorStop(1, '#01054f'); // azul escuro  
	context.fillStyle = fade;  // draw fade
	context.fillRect(0, 0, plane.width, plane.height);

    for (let i = 0; i < 500; i++) {
        const x = Math.random() * plane.width;
        const y = Math.random() * plane.height;
        context.beginPath();
        context.arc(x, y, 0.1, 0, 4 * Math.PI);
        context.fillStyle = '#ffffff';
        context.fill();
      }

    const texture = new THREE.CanvasTexture(plane);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
	return texture;

}



function createTerrain(){
    const geometryTerrain = new THREE.PlaneGeometry(500, 500, 256, 256);
    var flowers= generateFlowers();
    var texture = new THREE.TextureLoader().load('textures/heightmap.png');
    // config material
    const material = new THREE.MeshPhongMaterial({
        color: 0x074a0f,
        wireframe: false,
        map: flowers,
        displacementMap: texture,
        displacementScale: 100
    });
    // cria o terreno
    terrain = new THREE.Mesh(geometryTerrain, material);
    // posicao do terreno
    terrain.position.set(0, 0, 0);
    terrain.rotation.x = -Math.PI / 2;
    return terrain;
}

function createSkydome(){
    skyGeo = new THREE.SphereGeometry(250);
    var stars = generateSky();
    const material = new THREE.MeshPhongMaterial({
        wireframe: false,
        map: stars,
    });
    dome = new THREE.Mesh(skyGeo, material);
    dome.material.side = THREE.BackSide; 
    return dome;

}


function createOvni(x,y,z) {
	var ovni = new THREE.Object3D();

	bodyMesh = createBody();
	ovni.add(bodyMesh);
	spheres = createSpheres();
	spheres.position.set(0,-5/*height*/,0);
	ovni.add(spheres);
	bottomMesh = createBottom();
	bottomMesh.position.set(0,-4,0);
	ovni.add(bottomMesh);
	cockpitMesh = createCockpit();
	cockpitMesh.position.set(0,5.5,0);
	ovni.add(cockpitMesh);

	ovni.position.set(x,y,z);
	return ovni;
}

function createMoon(x,y,z) {
	var Moon = new THREE.Object3D();

	moonMesh = createMoonBody();
	Moon.add(moonMesh);
    moonLight = createLight();
    Moon.add(moonLight);
    moonLight.position.set(x,y,z);

	Moon.position.set(x,y,z);
	return Moon;
}

function createMoonBody(){
    'use strict';
    const geometry = new THREE.SphereGeometry(25);
    const material = new THREE.MeshPhongMaterial( {color: 0xf0c420 , shininess: 20 ,emissive:0xf0c420} ); 
    var moon = new THREE.Mesh( geometry, material ); 
    return moon;

}

function createBody() {
	const geom = new THREE.SphereGeometry(6,30,30);
	geom.scale(3.7,1,3.7);
	const material = new THREE.MeshPhongMaterial({color: 0xdddddd});
	var body = new THREE.Mesh(geom, material);
	return body;
}

function createSpheres() {
	spheres = new THREE.Object3D();
	var sphere;
	for (i= 0; i < 12; i++) {
		sphere = createSphere();
        spheresMesh.push(sphere);
		sphere.position.set(13*Math.sin(2*Math.PI*i/12),0,13*Math.cos(2*Math.PI*i/12));
		spheres.add(sphere);
	}
	return spheres;
}

function createSphere() {
	const geom = new THREE.SphereGeometry(1,12,12);
	const material = new THREE.MeshPhongMaterial({color: 0xfdfdfd});
	sphere = new THREE.Mesh(geom,material);
	sphere.add(new THREE.PointLight(0xffff00,1, 100));

	return sphere;
}

function createBottom(x,y,z) {
	const geom = new THREE.CylinderGeometry(9,9, 5, 64);
	const material = new THREE.MeshLambertMaterial({color: 0xDBAC34});
	var bottom = new THREE.Mesh(geom, material);
	var spotlight = new THREE.SpotLight(0xffff1f,1,80,Math.PI/2, 0.1, 80);
	spotlight.position.set(0,-2.5,0);
	spotlight.target = new THREE.Object3D();
	spotlight.target.position.set(x,-200,z);
    scene.add(spotlight.target);
	bottom.add(spotlight);
	return bottom;
}

function createCockpit() {
	const geom = new THREE.SphereGeometry(6,12,12,Math.PI,Math.PI*2,0,Math.PI/2);
	var material = new THREE.MeshPhongMaterial({color: 0x52B2BF});
	material.side = THREE.DoubleSide;
	var cockpit = new THREE.Mesh(geom,material);
	return cockpit;
}

function rotateOvni(deltaT) {
	ovni.rotateY(ovniAngularVelocity*deltaT);
}

function ovniMovement(deltaT) {
    var movementVector = new THREE.Vector3(ovniXMovementDirection, 0, ovniZMovementDirection);
    movementVector.normalize();
    ovni.translateOnAxis(movementVector,deltaT*ovniVelocityCap);
    ovniXMovementDirection = 0;
    ovniZMovementDirection = 0;
}

function createSobrero(x,y,z, scaleY, rotationY) {
	var tree = new THREE.Object3D();
	var coreTrunk = new THREE.CylinderGeometry(0.5,0.5,1.5,32);
    var material = new THREE.MeshLambertMaterial({color: 0x8B4513});
    var trunk = new THREE.Mesh(coreTrunk, material);
    trunks.push(trunk);
    var treeObj;
	var leftTrunk = createSubtrunk();
    tree.add(leftTrunk);
	var backTrunk = createSubtrunk();
    treeObj = new THREE.Object3D();
    treeObj.add(backTrunk);
    treeObj.rotateY(Math.PI/2);
    tree.attach(backTrunk);
	var rightTrunk = createSubtrunk();
    treeObj = new THREE.Object3D();
    treeObj.add(rightTrunk);
    treeObj.rotateY(Math.PI);
    tree.attach(rightTrunk);
	var frontTrunk = createSubtrunk();
    treeObj = new THREE.Object3D();
    treeObj.add(frontTrunk);
    treeObj.rotateY(Math.PI*3/2);
    tree.attach(frontTrunk);
    tree.add(trunk);
    tree.scale.set(1,scaleY,1);
    tree.rotateY(rotationY);
    tree.position.set(x, y + 1.5/2 * scaleY, z);
    return tree;
}
function createSubtrunk() {
    var trunkGeometry = new THREE.CylinderGeometry(0.2,0.2,2,32);
    trunkGeometry.rotateX(Math.PI/5);
    var trunkMaterial = new THREE.MeshLambertMaterial({color: 0x8B4513});
    var trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunks.push(trunk);
    var leavesGeometry = new THREE.SphereGeometry(0.5,32,32);
    var leavesMaterial = new THREE.MeshLambertMaterial({color: 0x008e00});
    var leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leavesMeshes.push(leaves);
    leaves.scale.set(1,1,2);
    leaves.position.set( 0,1*Math.cos(Math.PI/5),1*Math.sin(Math.PI/5) - 0);
    trunk.add(leaves);
    trunk.position.set(0,1.5/2 + Math.cos(Math.PI/5)*2/2 - 0.2,Math.sin(Math.PI/5)*2/2 );
    return trunk;
}

function createHouse(x, y, z) {
	// create a 3d house with windows using vertices in three.js
    var house = new THREE.Object3D();
    var houseGeometry = new THREE.BufferGeometry();
    var roofGeometry = new THREE.BufferGeometry();
    var splitterGeometry = new THREE.BufferGeometry();
    var doorGeometry = new THREE.BufferGeometry();
    var frontWindowGeometry = new THREE.BufferGeometry();
    var chimneyGeometry = new THREE.BufferGeometry();
    var sideWindowGeometry = new THREE.BufferGeometry();
    var splitterGeometry = new THREE.BufferGeometry();
    var vertices = new Float32Array( [
        0, 0, 0, //0 bottom back left
        0, 0, 10, //1 bottom front left
        20, 0, 10, //2 bottom front right
        20, 0, 0, //3 bottom back right
        0, 7, 0, //4 top back left
        0, 7, 10, //5 top front left
        20, 7, 10, //6 top front right
        20, 7, 0, //7 top back right
        5, 15, 5, //8 top
        // door hole
        5, 0, 10, //9 door hole bottom left
        5, 5, 10, //10 door hole top left
        7, 0, 10, //11 door hole bottom right
        7, 5, 10, //12 door hole top right
        // door frame
        5, 0, 9.2, //13 door bottom left
        5, 5, 9.2, //14 door top left
        7, 0, 9.2, //15 door bottom right
        7, 5, 9.2, //16 door top right
        // window hole
        2, 2, 10, //17 hole bottom left
        2, 4.5, 10, //18 hole top left
        4, 2, 10, //19 hole bottom right
        4, 4.5, 10, //20 hole top right
        // window frame
        2, 2, 9.8, //21 window bottom left
        2, 4.5, 9.8, //22 window top left
        4, 2, 9.8, //23 window bottom right
        4, 4.5, 9.8, //24 window top right
        // roof tip
        0, 12, 5, //25 roof tip left
        20, 12, 5, //26 roof tip right
        //chimney
        12, 7, 8, //27 chimney bottom back left
        12, 7, 9, //28 chimney bottom front left
        13, 7, 9, //29 chimney bottom front right
        13, 7, 8, //30 chimney bottom back right
        12, 13, 8, //31 chimney top back left
        12, 13, 9, //32 chimney top front left
        13, 13, 9, //33 chimney top front right
        13, 13, 8, //34 chimney top back right
        // rightside window
        // window hole
        13, 2, 10, //35 hole bottom left
        13, 4.5, 10, //36 hole top left
        15, 2, 10, //37 hole bottom right
        15, 4.5, 10, //38 hole top right
        // window frame
        13, 2, 9.8, //39 window bottom left
        13, 4.5, 9.8, //40 window top left
        15, 2, 9.8, //41 window bottom right
        15, 4.5, 9.8, //42 window top right
        // right side compartment
        20, 0, 9, //43 compartment bottom back left
        20, 0, 6, //44 compartment bottom front left
        23, 0, 6, //45 compartment bottom front right
        23, 0, 9, //46 compartment bottom back right
        20, 6.5, 9, //47 compartment top back left
        20, 6.5, 6, //48 compartment top front left
        23, 5, 6, //49 compartment top front right
        23, 5, 9, //50 compartment top back right
        // compartment roof
        24, 4.5, 6, //51 compartment roof front right
        24, 4.5, 9, //52 compartment roof back right
        //splitter
        9, 0, 14, //53 splitter left
        10, 0, 14, //54 splitter right
        9, 0, 10, //55 splitter back
        10, 0, 10, //56 splitter front
        9, 8, 11.5, //57 splitter left top
        10, 8, 11.5, //58 splitter right top
        9, 7, 10, //59 splitter back top
        10, 7, 10, //60 splitter front top
        9, 10, 8, //61 splitter left top top
        10, 10, 8, //62 splitter right top top
        9, 9, 10, //63 splitter back top top
        10, 9, 10, //64 splitter front top top

    ]);
    const indices = [
        // bottom
        9, 1, 13,
        1, 0, 13,
        0, 3, 13,
        3, 15, 13,
        3, 2, 15,
        2, 11, 15,
        // front
        1, 17, 5,
        5, 17, 18,
        5, 18, 59,
        59, 20, 10,
        18, 20, 59,
        59, 10, 12,
        59, 12, 55,
        55, 12, 11,
        9, 10, 19,
        9, 19, 1,
        1, 19, 17,
        1, 19, 9,
        20, 19, 10,
        
        56, 35, 36,
        56, 36, 60,
        60, 36, 38,
        60, 38, 6,
        6, 38, 37,
        6, 37, 2,
        2, 37, 35,
        2, 35, 56,
        // back
        0, 7, 3,
        0, 4, 7,
        // left
        0, 1, 4,
        1, 5, 4,
        4, 5, 25,
        // right
        6, 2, 3,
        6, 3, 7,
        6, 7, 26,
        // door left
        10, 9, 13,
        10, 13, 14,
        // door right
        11, 12, 15,
        12, 16, 15,
        // door top
        12, 10, 16,
        10, 14, 16,
        // window bottom
        17, 19, 21,
        19, 23, 21,
        // window top
        18, 22, 20,
        20, 22, 24,
        // window left
        18, 17, 21,
        18, 21, 22,
        // window right
        19, 20, 23,
        20, 24, 23,
        // right side window bottom
        35, 37, 39,
        39, 37, 41,
        // right side window top
        38, 36, 40,
        38, 40, 42,
        // right side window left
        35, 39, 36,
        36, 39, 40,
        // right side window right
        37, 38, 41,
        38, 42, 41,
    ];
    houseGeometry.setIndex(indices);

    houseGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    houseGeometry.computeVertexNormals();
    var roofIndices = [
        5, 6, 25,
        6, 26, 25,
        7, 25, 26,
        7, 4, 25,
    ];
    roofGeometry.setIndex(roofIndices);
    roofGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    roofGeometry.computeVertexNormals();
    frontWindowIndices = [
        21, 23, 22,
        23, 24, 22,
    ];
    frontWindowGeometry.setIndex(frontWindowIndices);
    frontWindowGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    frontWindowGeometry.computeVertexNormals();
    sideWindowIndices = [
        39, 41, 40,
        40, 41, 42,
    ];
    doorIndices = [
        13, 15, 14,
        14, 15, 16,
    ];
    doorGeometry.setIndex(doorIndices);
    doorGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    doorGeometry.computeVertexNormals();
    sideWindowGeometry.setIndex(sideWindowIndices);
    sideWindowGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    sideWindowGeometry.computeVertexNormals();
    splitterIndices = [
        53, 59, 55,
        53, 57, 59,
        59, 57, 63,
        57, 61, 63,
        54, 56, 60,
        54, 60, 58,
        58, 60, 64,
        58, 64, 62,
        53, 54, 57,
        54, 58, 57,
        57, 58, 61,
        58, 62, 61,
        61, 62, 63,
        62, 64, 63,
    ];
    splitterGeometry.setIndex(splitterIndices);
    splitterGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    splitterGeometry.computeVertexNormals();
    chimneyIndices = [
        28, 27, 31,
        28, 32, 31,
        27, 30, 31,
        31, 30, 34,
        29, 30, 33,
        33, 30, 34,
        28, 29, 32,
        29, 33, 32,
        31, 32, 34,
        34, 32, 33,
    ];
    chimneyGeometry.setIndex(chimneyIndices);
    chimneyGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    chimneyGeometry.computeVertexNormals();
    var wallMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
    var doorMaterial = new THREE.MeshLambertMaterial({color: 0xeedddd, wireframe: false});
    var roofMaterial = new THREE.MeshLambertMaterial({color: 0xdc9999, wireframe: false});
    var windowMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff, wireframe: false});
    houseMesh = new THREE.Mesh(houseGeometry, wallMaterial);
    roofMesh = new THREE.Mesh(roofGeometry, roofMaterial);
    frontWindowMesh = new THREE.Mesh(frontWindowGeometry, windowMaterial);
    doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
    sideWindowMesh = new THREE.Mesh(sideWindowGeometry, windowMaterial);
    splitterMesh = new THREE.Mesh(splitterGeometry, wallMaterial);
    chimneyMesh = new THREE.Mesh(chimneyGeometry, wallMaterial);
    house.add(houseMesh);
    house.add(roofMesh);
    house.add(doorMesh);
    house.add(frontWindowMesh);
    house.add(sideWindowMesh);
    house.add(splitterMesh);
    house.add(chimneyMesh);
    house.position.set(x, y, z);
    house.rotation.y = Math.PI /4;
    return house;
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';
}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';
}

////////////
/* UPDATE */
////////////
function update(){
    var deltaT = clock.getDelta();
    ovniMovement(deltaT);
    rotateOvni(deltaT);
    'use strict';
}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene,camera);

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    ovniXMovementDirection = 0;
    ovniZMovementDirection = 0;
    createScene();
    createCamera();
    camera = camera1;
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    clock = new THREE.Clock();
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    render();
    requestAnimationFrame( animate );
    update();
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera1.left = -window.innerWidth/2;
        camera1.right = window.innerWidth/2;
        camera1.top = window.innerHeight/2;
        camera1.bottom = -window.innerHeight/2;
        camera1.updateProjectionMatrix();
    }


}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 49:
            camera=camera1;
            flowerSwitch();
            break;
        case 50:
            starSwitch();
            break;
        case 68:
            lightSwitch();
            break;
        case 81:
            lambertMaterials();
						break;
        case 87:
            phongMaterials();
						break;
        case 69:
            toonMaterials();
						break;
        case 82:
            basicMaterials();
						break;
        case 40:
            ovniXMovementDirection = 1;
            break;
        case 38:
            ovniXMovementDirection = -1;
            break;
        case 37:
            ovniZMovementDirection = -1;
            break;
        case 39:
            ovniZMovementDirection = 1;
            break;
        }

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}
