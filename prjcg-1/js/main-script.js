//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, camera, camera1, camera2, camera3, camera4, camera5;
var clock;
var cameraWidth = window.innerWidth/2;
var cameraHeight = window.innerHeight/2;
var renderer, material;
var wireframeFlag = false;
var robot, rightArm, leftArm, leftLeg, rightLeg, lowerLeftLeg, lowerRightLeg, head ,abdomen, waist, body, antenna1, antenna2,rww,lww,leftFArm,rightFArm,llw,lllw,rlw,rllw,leftFoot,rightFoot,lE,rE;
var trailer, box, rfw, rbw, lfw, lbw, attachment;
var trailerBox,truckBox;
var intersected = false;
var feetRotationDirection, legRotationDirection, armMovementDirection, headRotationDirection, trailerZMovementDirection, trailerXMovementDirection;
var robotMode, armsInRobotMode, headInRobotMode, legsInRobotMode, feetInRobotMode;
var animationInProgress;

const trailerVelocityCap = 40, legRotationVelocity = 2, feetRotationVelocity = 4, armXVelocity = 5, armZVelocity = 10, headRotationVelocity = 2;


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){

    'use strict';

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xb3c7af);

    scene.add(new THREE.AxisHelper(10));

    createRobot(0,0,0);
    createTrailer (0,7.5,-150);
	resetMovementVariables();
}

function resetMovementVariables() {
	feetRotationDirection = 0;
	legRotationDirection = 0;
	armMovementDirection = 0;
	headRotationDirection = 0;
	trailerZMovementDirection = 0;
	trailerXMovementDirection = 0;
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';

    camera1 = new THREE.OrthographicCamera( -cameraWidth, cameraWidth, cameraHeight, -cameraHeight, 1, 1000 ); 
    camera1.position.x = 0;
    camera1.position.y = 0;
    camera1.position.z = 50;
    camera1.lookAt(scene.position);
    scene.add( camera1 );

    camera2 = new THREE.OrthographicCamera( -cameraWidth, cameraWidth, cameraHeight, -cameraHeight, 1, 1000 ); 
    camera2.position.x = 50;
    camera2.position.y = 0;
    camera2.position.z = 0;
    camera2.lookAt(scene.position);
    scene.add( camera2 );

    camera3 = new THREE.OrthographicCamera( -cameraWidth, cameraWidth, cameraHeight, -cameraHeight, 1, 1000 ); 
    camera3.position.x = 0;
    camera3.position.y = 50;
    camera3.position.z = 0;
    camera3.lookAt(scene.position);
    scene.add( camera3 );

    camera4 = new THREE.OrthographicCamera( -cameraWidth, cameraWidth, cameraHeight, -cameraHeight, 1, 1000 );
    camera4.position.x = 100;
    camera4.position.y = 100;
    camera4.position.z = 100;
    camera4.lookAt(scene.position);
    scene.add( camera4 );

    camera5 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000); 
    camera5.position.x = 100;
    camera5.position.y = 100;
    camera5.position.z = 100;
    camera5.lookAt(scene.position);
    scene.add( camera5 );

}


/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createHead(obj,x,y,z){
    'use strict';

    const geometry = new THREE.BoxGeometry( 15, 20, 20 ); 
    material = new THREE.MeshBasicMaterial( {color: 0xf71432 } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    obj.add( cube );
    return cube;

}

function createBody(obj,x,y,z){
    'use strict';

    const geometry = new THREE.BoxGeometry( 45, 40, 35 ); 

    if(wireframeFlag == true){
        material = new THREE.MeshBasicMaterial( {color: 0x3434eb, wireframe : true} )
    }else{
        material = new THREE.MeshBasicMaterial( {color: 0x3434eb} );
    }
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    obj.add( cube );
    return cube;

}

function createAbdomen(obj,x,y,z){
    'use strict';

    const geometry = new THREE.BoxGeometry( 25, 20, 35 ); 
    material = new THREE.MeshBasicMaterial( {color: 0x3434eb } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    obj.add( cube );
    return cube;

}

function createWheel(obj,x,y,z){
    'use strict';
    const geometry = new THREE.CylinderGeometry( 12.5, 12.5, 10, 64 ); 
    const material = new THREE.MeshBasicMaterial( {color: 0x070808} ); 
    const cylinder = new THREE.Mesh( geometry, material ); 
    cylinder.position.set(x, y, z);
    cylinder.rotation.z=Math.PI/2;
    obj.add( cylinder );
    return cylinder;

}

function createExhaust(obj,x,y,z){
    'use strict';
    const geometry = new THREE.CylinderGeometry( 2.5, 2.5, 45, 64 ); 
    const material = new THREE.MeshBasicMaterial( {color: 0x070808} ); 
    const cylinder = new THREE.Mesh( geometry, material ); 
    cylinder.position.set(x, y, z);
    obj.add( cylinder );
    return cylinder;

}

function createAntenna(obj,x,y,z){
    'use strict';
    const geometry = new THREE.CylinderGeometry( 0, 2.5, 5, 64 ); 
    const material = new THREE.MeshBasicMaterial( {color: 0x3434eb} ); 
    const cylinder = new THREE.Mesh( geometry, material ); 
    cylinder.position.set(x, y, z);
    obj.add( cylinder );
    return cylinder;

}

function createFeet(obj,x,y,z){
    'use strict';

    const geometry = new THREE.BoxGeometry( 15,10, 20 ); 
    material = new THREE.MeshBasicMaterial( {color: 0x3434eb } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    obj.add( cube );
    return cube;


}

function createWaist(obj,x,y,z){
    'use strict';

    const geometry = new THREE.BoxGeometry( 35, 10, 35 ); 
    material = new THREE.MeshBasicMaterial( {color: 0xf71432 } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    obj.add( cube );
    return cube;

}

function createThigh(obj,x,y,z){
    'use strict';

    const geometry = new THREE.BoxGeometry( 5, 15, 10 ); 
    material = new THREE.MeshBasicMaterial( {color: 0x3434eb } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    obj.add( cube );
    return cube;
}

function createLeg(obj,x,y,z){
    'use strict';

    const geometry = new THREE.BoxGeometry( 15, 55, 20 ); 
    material = new THREE.MeshBasicMaterial( {color: 0xf71432 } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    obj.add( cube );
    return cube;
}

function createArm(obj,x,y,z){
    'use strict';

    const geometry = new THREE.BoxGeometry( 10, 50, 15 ); 
    material = new THREE.MeshBasicMaterial( {color: 0xf71432 } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    obj.add( cube );
    return cube;

}
function createForearm(obj,x,y,z){
    'use strict';

    const geometry = new THREE.BoxGeometry( 10, 10, 30 ); 
    material = new THREE.MeshBasicMaterial( {color: 0x03fc0f } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    obj.add( cube );
    return cube;



}
function createBox(obj,x,y,z){
    'use strict';
    const geometry = new THREE.BoxGeometry( 45, 80, 120 ); 
    material = new THREE.MeshBasicMaterial( {color: 0x606878} );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    obj.add( cube );
    return cube;

}

function createAttachment(obj,x,y,z){
    'use strict';
    const geometry = new THREE.BoxGeometry( 30, 5, 30 ); 
    material = new THREE.MeshBasicMaterial( {color: 0x070808} );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(x, y, z);
    obj.add( cube );
    return cube;

}

function createTrailer(x,y,z){
    'use strict';
    trailer = new THREE.Object3D();
    box = createBox(trailer,0,0,0);

    rfw = createWheel(box,20,-52.5,-22.5); //right front wheel
    rbw = createWheel(box,20,-52.5,-47.5);  //right back wheel
    lfw = createWheel(box,-20,-52.5,-22.5); //left front wheel
    lbw = createWheel(box,-20,-52.5,-47.5); //right front wheel

    trailer.position.x = x;
    trailer.position.y = y;
    trailer.position.z = z;

    attachment = createAttachment(box,0,-37.5,75);
    trailerBox = new THREE.Box3().setFromObject(trailer);
    scene.add(trailer);
}

function createRobot(x,y,z){
    'use strict';
    robot = new THREE.Object3D();

    body = createBody(robot,0,0,0);

    head = createHead(robot,0,30,-7.5);

    antenna1 = createAntenna(head, 5,12.5,0); // right antenna
    antenna2 = createAntenna(head, -5,12.5,0); // left antenna

    abdomen =createAbdomen(robot,0,-30,0);
    
    waist = createWaist(robot,0,-45,0);
    rww = createWheel(waist,22.5,0,-13.5) //right waist wheel
    lww = createWheel(waist,-22.5,0,-13.5) //left waist wheel

    
    rightLeg = createThigh(robot,10,-57.5,-17.5); //right thigh
    leftLeg = createThigh(robot,-10,-57.5,-17.5); //left Thigh

    lowerLeftLeg = createLeg(leftLeg,0,-35,0); //left leg
    lowerRightLeg = createLeg(rightLeg,0,-35,0); //right leg

    llw = createWheel(lowerLeftLeg,-12.5,10,0) //left leg wheel
    lllw = createWheel(lowerLeftLeg,-12.5,-15,0) //left lower leg wheel
    rlw = createWheel(lowerRightLeg,12.5,10,0) //right leg wheel
    rllw = createWheel(lowerRightLeg,12.5,-15,0) //right lower leg wheel
    
    leftFoot = createFeet(lowerLeftLeg,0,-22.5,20)  //left foot
    rightFoot = createFeet(lowerRightLeg,0,-22.5,20) // right foot

    rightArm = createArm(robot,27.5,-5,-10); //right arm
    leftArm = createArm(robot,-27.5,-5,-10); //left arm

    rE = createExhaust(rightArm,8,7.5,0); // right exhaust
    lE = createExhaust(leftArm,-8,7.5,0); // left exhaust

    rightFArm = createForearm(rightArm,0,-20,22.5); //right arm
    leftFArm = createForearm(leftArm,0,-20,22.5); //left arm
 
    robot.position.x = x;
    robot.position.y = y;
    robot.position.z = z;

    truckBox = new THREE.Box3().setFromObject(robot);
    scene.add(robot);



}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';
	truckBox = truckBox.setFromObject(robot);
	trailerBox = trailerBox.setFromObject(trailer);
    if(truckBox.intersectsBox(trailerBox) && intersected == false){
        handleCollisions();
        console.log("colide");
    }

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';
    if (!robotMode) {
        console.log("assembling");
        animationInProgress = 1;
    }
    intersected = true;

}

function robotModeAssert() {
    if (headInRobotMode || armsInRobotMode || legsInRobotMode || feetInRobotMode) {
        if (animationInProgress) {
            animationInProgress = 0;
        }
        return 1;
    }
    else {
        console.log("truck!");
        return 0;
    }
}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';
    var deltaT = clock.getDelta();
    if (headRotationDirection == -1) {
        rotateHeadBackward(deltaT);
    } else if (headRotationDirection == 1) {
        rotateHeadForward(deltaT);
    }

    if (armMovementDirection == -1) {
        armStepBackward(deltaT);
    }
    else if (armMovementDirection == 1) {
        armStepForward(deltaT);
    }

    if (legRotationDirection == -1) {
        legRotateBackward(deltaT);
    }
    else if (legRotationDirection == 1) {
        legRotateForward(deltaT);
    }

    if (feetRotationDirection == -1) {
        feetRotateBackward(deltaT);
    }
    else if (feetRotationDirection == 1) {
        feetRotateForward(deltaT);
    }
    robotMode = robotModeAssert();
    if (!animationInProgress) {
    	trailerMovement(deltaT);
    }
    if (animationInProgress) {
        assemblyAnimation(deltaT);
    }
    resetMovementVariables();
    return deltaT;
}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render( scene, camera ); 
 
}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    createScene();
    createCamera();
    clock = new THREE.Clock(true);
    camera = camera1;
    render();
    headInRobotMode = 1;
    armsInRobotMode = 1;
    legsInRobotMode = 1;
    feetInRobotMode = 1;
    animationInProgress = 0;

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    
}

function rotateHeadForward(deltaT) {
    if (head.rotation.x + deltaT*headRotationVelocity <= 0 ) {
        rotateObject(head, new THREE.Vector3(head.position.x,
		head.position.y - Math.cos(head.rotation.x)*head.geometry.boundingBox.max.y + Math.sin(head.rotation.x)*head.geometry.boundingBox.max.z,
		head.position.z - Math.sin(head.rotation.x)*head.geometry.boundingBox.max.y - Math.cos(head.rotation.x)*head.geometry.boundingBox.max.z), new THREE.Vector3(1,0,0),deltaT*headRotationVelocity);
	    headInRobotMode = 1;
        return -1;
    }
    return 1;
}

function rotateHeadBackward(deltaT) {
    if (head.rotation.x -deltaT*headRotationVelocity >= -Math.PI && head.rotation.x -deltaT*headRotationVelocity <= 0 ) {
        rotateObject(head, new THREE.Vector3(head.position.x,
		head.position.y - Math.cos(head.rotation.x)*head.geometry.boundingBox.max.y + Math.sin(head.rotation.x)*head.geometry.boundingBox.max.z,
		head.position.z - Math.sin(head.rotation.x)*head.geometry.boundingBox.max.y - Math.cos(head.rotation.x)*head.geometry.boundingBox.max.z), new THREE.Vector3(1,0,0),-deltaT*headRotationVelocity);
        return 1;
    }
    headInRobotMode = 0;
    return -1;
}

function assemblyAnimation(deltaT) {
    if (trailer.position.distanceTo(new THREE.Vector3(robot.position.x, robot.position.y, robot.position.z - 150)) >= 10) {
        var movementVector = new THREE.Vector3(robot.position.x - trailer.position.x, 0, robot.position.z - 150 - trailer.position.z);
        movementVector.normalize();
        trailer.translateOnAxis(movementVector,deltaT*trailerVelocityCap);
    }
    else {
        console.log("finished");
        animationInProgress = 0;
    }
}

function trailerMovement(deltaT) {
    var movementVector = new THREE.Vector3(trailerXMovementDirection, 0, trailerZMovementDirection);
    movementVector.normalize();
    trailer.translateOnAxis(movementVector,deltaT*trailerVelocityCap);
}

function rotateObject(obj, point, axis, theta){
    obj.position.sub(point);
    obj.position.applyAxisAngle(axis, theta);
    obj.position.add(point);
	obj.rotateOnAxis(axis, theta);
}

function feetRotateForward(deltaT) {
	if (rightFoot.rotation.x  -deltaT*feetRotationVelocity >= 0) {
	rotateObject(rightFoot, new THREE.Vector3(rightFoot.position.x,
		rightFoot.position.y - Math.cos(rightFoot.rotation.x)*rightFoot.geometry.boundingBox.max.y + Math.sin(rightFoot.rotation.x)*rightFoot.geometry.boundingBox.max.z,
		rightFoot.position.z - Math.sin(rightFoot.rotation.x)*rightFoot.geometry.boundingBox.max.y - Math.cos(rightFoot.rotation.x)*rightFoot.geometry.boundingBox.max.z), new THREE.Vector3(1,0,0),-deltaT*feetRotationVelocity);
	rotateObject(leftFoot, new THREE.Vector3(leftFoot.position.x,
		leftFoot.position.y - Math.cos(leftFoot.rotation.x)*leftFoot.geometry.boundingBox.max.y + Math.sin(leftFoot.rotation.x)*leftFoot.geometry.boundingBox.max.z,
		leftFoot.position.z - Math.sin(leftFoot.rotation.x)*leftFoot.geometry.boundingBox.max.y - Math.cos(leftFoot.rotation.x)*leftFoot.geometry.boundingBox.max.z), new THREE.Vector3(1,0,0),-deltaT*feetRotationVelocity);
		feetInRobotMode = 1;
        return 1;
	}
	return -1;
}

function feetRotateBackward(deltaT) {
	if (leftFoot.rotation.x +0.01 <= Math.PI && leftFoot.rotation.x +deltaT*feetRotationVelocity >= 0) {
	rotateObject(rightFoot, new THREE.Vector3(rightFoot.position.x,
		rightFoot.position.y - Math.cos(rightFoot.rotation.x)*rightFoot.geometry.boundingBox.max.y + Math.sin(rightFoot.rotation.x)*rightFoot.geometry.boundingBox.max.z,
		rightFoot.position.z - Math.sin(rightFoot.rotation.x)*rightFoot.geometry.boundingBox.max.y - Math.cos(rightFoot.rotation.x)*rightFoot.geometry.boundingBox.max.z), new THREE.Vector3(1,0,0),deltaT*feetRotationVelocity);
	rotateObject(leftFoot, new THREE.Vector3(leftFoot.position.x,
		leftFoot.position.y - Math.cos(leftFoot.rotation.x)*leftFoot.geometry.boundingBox.max.y + Math.sin(leftFoot.rotation.x)*leftFoot.geometry.boundingBox.max.z,
		leftFoot.position.z - Math.sin(leftFoot.rotation.x)*leftFoot.geometry.boundingBox.max.y - Math.cos(leftFoot.rotation.x)*leftFoot.geometry.boundingBox.max.z), new THREE.Vector3(1,0,0),deltaT*feetRotationVelocity);
		return -1;
	}
    feetInRobotMode = 0;
	return 1;
}

function legRotateForward(deltaT) {
	if (rightLeg.rotation.x -deltaT*legRotationVelocity >= 0) {
	rotateObject(rightLeg, new THREE.Vector3(rightLeg.position.x,
		rightLeg.position.y + Math.cos(rightLeg.rotation.x)*rightLeg.geometry.boundingBox.max.y + Math.sin(rightLeg.rotation.x)*rightLeg.geometry.boundingBox.max.z,
		rightLeg.position.z + Math.sin(rightLeg.rotation.x)*rightLeg.geometry.boundingBox.max.y + Math.cos(rightLeg.rotation.x)*rightLeg.geometry.boundingBox.max.z),
		new THREE.Vector3(1,0,0),-deltaT*legRotationVelocity,true);
	rotateObject(leftLeg, new THREE.Vector3(leftLeg.position.x,
		leftLeg.position.y + Math.cos(leftLeg.rotation.x)*leftLeg.geometry.boundingBox.max.y + Math.sin(leftLeg.rotation.x)*leftLeg.geometry.boundingBox.max.z,
		leftLeg.position.z + Math.sin(leftLeg.rotation.x)*leftLeg.geometry.boundingBox.max.y + Math.cos(leftLeg.rotation.x)*leftLeg.geometry.boundingBox.max.z), new THREE.Vector3(1,0,0),-deltaT*legRotationVelocity);
        legsInRobotMode = 1;
        return 1;
	}
	return -1;
}

function legRotateBackward(deltaT) {
	if (leftLeg.rotation.x +deltaT*legRotationVelocity <= Math.PI/2) {
	rotateObject(rightLeg, new THREE.Vector3(rightLeg.position.x,
		rightLeg.position.y + Math.cos(rightLeg.rotation.x)*rightLeg.geometry.boundingBox.max.y + Math.sin(rightLeg.rotation.x)*rightLeg.geometry.boundingBox.max.z,
		rightLeg.position.z + Math.sin(rightLeg.rotation.x)*rightLeg.geometry.boundingBox.max.y + Math.cos(rightLeg.rotation.x)*rightLeg.geometry.boundingBox.max.z),
		new THREE.Vector3(1,0,0),deltaT*legRotationVelocity,true);
	rotateObject(leftLeg, new THREE.Vector3(leftLeg.position.x,
		leftLeg.position.y + Math.cos(leftLeg.rotation.x)*leftLeg.geometry.boundingBox.max.y + Math.sin(leftLeg.rotation.x)*leftLeg.geometry.boundingBox.max.z,
		leftLeg.position.z + Math.sin(leftLeg.rotation.x)*leftLeg.geometry.boundingBox.max.y + Math.cos(leftLeg.rotation.x)*leftLeg.geometry.boundingBox.max.z), new THREE.Vector3(1,0,0),deltaT*legRotationVelocity);
		return -1;
	}
    legsInRobotMode = 0;
	return 1;
}

function armStepForward(deltaT) {
    if (rightArm.position.x + deltaT*armXVelocity < body.geometry.boundingBox.max.x + rightArm.geometry.boundingBox.max.x) {
        rightArm.position.x += deltaT*armXVelocity;
        leftArm.position.x -= deltaT*armXVelocity;
        armsInRobotMode = 1;
        return -1;
    }
    else if (rightArm.position.z + deltaT*armZVelocity < body.geometry.boundingBox.min.z + rightArm.geometry.boundingBox.max.z) {
        rightArm.position.z += deltaT*armZVelocity;
        leftArm.position.z += deltaT*armZVelocity;
        return -1;
    }
    else {
        return 0;
    }
}

function armStepBackward(deltaT) { //backward
    if (rightArm.position.z - deltaT*armZVelocity > body.geometry.boundingBox.min.z + rightArm.geometry.boundingBox.min.z) {
        rightArm.position.z -= deltaT*armZVelocity;
        leftArm.position.z -= deltaT*armZVelocity;
        return 0;
    }
    else if (rightArm.position.x - deltaT*armXVelocity > body.geometry.boundingBox.max.x - rightArm.geometry.boundingBox.max.x) {
        rightArm.position.x -= deltaT*armXVelocity;
        leftArm.position.x += deltaT*armXVelocity;
        return 0;
    }
    else {
        armsInRobotMode = 0;
        return -1;
    }
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

	update();
    if(truckBox.intersectsBox(trailerBox)==false){intersected=false;}
    checkCollisions();
    
    render();
    requestAnimationFrame( animate );
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
        camera2.left = -window.innerWidth/2;
        camera2.right = window.innerWidth/2;
        camera2.top = window.innerHeight/2;
        camera2.bottom = -window.innerHeight/2;
        camera2.updateProjectionMatrix();
        camera3.left = -window.innerWidth/2;
        camera3.right = window.innerWidth/2;
        camera3.top = window.innerHeight/2;
        camera3.bottom = -window.innerHeight/2;
        camera3.updateProjectionMatrix();
        camera4.left = -window.innerWidth/2;
        camera4.right = window.innerWidth/2;
        camera4.top = window.innerHeight/2;
        camera4.bottom = -window.innerHeight/2;
        camera4.updateProjectionMatrix();
        camera5.aspect = window.innerWidth / window.innerHeight;
        camera5.updateProjectionMatrix();
    }

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
    case 49: //1
        camera = camera1;
        break;
    case 50: //2
        camera = camera2;
        break;
    case 51:  //3
        camera = camera3;
        break;
    case 52: //4
        camera = camera4;
        break;
    case 53:  //5
        camera = camera5;
        break;
    case 54: //6
        if(wireframeFlag == false){
            head.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            body.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            rightArm.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            leftArm.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            leftLeg.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            rightLeg.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            lowerLeftLeg.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            lowerRightLeg.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            abdomen.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            waist.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            antenna1.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            antenna2.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            rww.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            lww.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            leftFArm.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            rightFArm.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            llw.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            lllw.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            rlw.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            rllw.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            leftFoot.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            rightFoot.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            lE.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            rE.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});

            attachment.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            lfw.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            lbw.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            rfw.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            rbw.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});
            box.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: true});


            wireframeFlag = true;
        }else{
            head.material = new THREE.MeshBasicMaterial({color: 0xf71432,wireframe: false });
            body.material = new THREE.MeshBasicMaterial({color: 0x3434eb ,wireframe: false});
            rightArm.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: false});
            leftArm.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: false});
            leftLeg.material = new THREE.MeshBasicMaterial({color: 0x3434eb,wireframe: false });
            rightLeg.material = new THREE.MeshBasicMaterial({color: 0x3434eb ,wireframe: false});
            lowerLeftLeg.material = new THREE.MeshBasicMaterial({color: 0xf71432 ,wireframe: false});
            lowerRightLeg.material = new THREE.MeshBasicMaterial({color: 0xf71432, wireframe: false});
            abdomen.material = new THREE.MeshBasicMaterial({color: 0x3434eb ,wireframe: false});
            waist.material = new THREE.MeshBasicMaterial({color: 0xf71432,wireframe: false });
            antenna1.material = new THREE.MeshBasicMaterial({color: 0x3434eb,wireframe: false });
            antenna2.material = new THREE.MeshBasicMaterial({color: 0x3434eb,wireframe: false });
            rww.material = new THREE.MeshBasicMaterial({color: 0x070808 ,wireframe: false});
            lww.material = new THREE.MeshBasicMaterial({color: 0x070808,wireframe: false });
            leftFArm.material = new THREE.MeshBasicMaterial({color: 0x3434eb,wireframe: false });
            rightFArm.material = new THREE.MeshBasicMaterial({color: 0x3434eb,wireframe: false });
            llw.material = new THREE.MeshBasicMaterial({color: 0x070808,wireframe: false });
            lllw.material = new THREE.MeshBasicMaterial({color: 0x070808,wireframe: false });
            rlw.material = new THREE.MeshBasicMaterial({color: 0x070808,wireframe: false });
            rllw.material = new THREE.MeshBasicMaterial({color: 0x070808 ,wireframe: false});
            leftFoot.material = new THREE.MeshBasicMaterial({color: 0x3434eb,wireframe: false });
            rightFoot.material = new THREE.MeshBasicMaterial({color: 0x3434eb,wireframe: false });
            lE.material = new THREE.MeshBasicMaterial({color: 0x070808,wireframe: false });
            rE.material = new THREE.MeshBasicMaterial({color: 0x070808,wireframe: false });

            attachment.material = new THREE.MeshBasicMaterial({color: 0x070808 ,wireframe: false});
            lfw.material = new THREE.MeshBasicMaterial({color: 0x070808 ,wireframe: false});
            lbw.material = new THREE.MeshBasicMaterial({color: 0x070808 ,wireframe: false});
            rfw.material = new THREE.MeshBasicMaterial({color: 0x070808 ,wireframe: false});
            rbw.material = new THREE.MeshBasicMaterial({color: 0x070808 ,wireframe: false});
            box.material = new THREE.MeshBasicMaterial({color: 0x606878 ,wireframe: false});

            wireframeFlag = false;
        }
        break;
			case 38:
				if (trailerZMovementDirection != 0) {
					trailerZMovementDirection = 0;
				}
				else {
					trailerZMovementDirection = -1;
				}
				break;
			case 40:
				if (trailerZMovementDirection != 0) {
					trailerZMovementDirection = 0;
				}
				else {
					trailerZMovementDirection = 1;
				}
				break;
			case 37:
				if (trailerXMovementDirection != 0) {
					trailerXMovementDirection = 0;
				}
				else {
					trailerXMovementDirection = -1;
				}
				break;
			case 39:
				if (trailerXMovementDirection != 0) {
					trailerXMovementDirection = 0;
				}
				else {
					trailerXMovementDirection = 1;
				}
				break;
            case 82: // r
                if ( headRotationDirection != 0) {
                    headRotationDirection = 0
                }
                else {
                    headRotationDirection = -1;
                }
                break;
            case 70: // f
                if ( headRotationDirection != 0) {
                    headRotationDirection = 0
                }
                else {
                    headRotationDirection = 1;
                }
                break;
            case 69: // e
                if ( armMovementDirection != 0) {
                    armMovementDirection = 0
                }
                else {
                    armMovementDirection = -1;
                }
                break;
            case 68: // d
                if ( armMovementDirection != 0) {
                    armMovementDirection = 0
                }
                else {
                    armMovementDirection = 1;
                }
                break;
            case 87: // w
                if ( legRotationDirection != 0) {
                    legRotationDirection = 0
                }
                else {
                    legRotationDirection = -1;
                }
                break;
            case 83: // s
                if ( legRotationDirection != 0) {
                    legRotationDirection = 0
                }
                else {
                    legRotationDirection = 1;
                }
                break;
            case 81: // q
                if ( feetRotationDirection != 0) {
                    feetRotationDirection = 0
                }
                else {
                    feetRotationDirection = -1;
                }
                break;
            case 65: // a
                if ( feetRotationDirection != 0) {
                    feetRotationDirection = 0
                }
                else {
                    feetRotationDirection = 1;
                }
                break;

    }

}


///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
    switch (e.keyCode) {
        case 49: //1
            camera = camera1;
            break;
    }
}
