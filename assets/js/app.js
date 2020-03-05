//let them
let scene, camera, renderer, mesh;
let meshFloor, ambientLight, light, controls;
 
let keyboard = {};
let player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };
let USE_WIREFRAME = false;
 
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);

//SKY SCENE BACKGROUND
let skyMaterialArray = [];
for (var i = 0; i < 6; i++)
skyMaterialArray.push( new THREE.MeshBasicMaterial({
   map: new THREE.TextureLoader().load('assets/textures/gray.jpg'),
   side: THREE.BackSide
}));
let skyGeometry = new THREE.CubeGeometry( 950,900, 1000 );
let skyMaterial = new THREE.MeshFaceMaterial( skyMaterialArray );
let skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(skyBox);


//STATUE MODEL
let loader = new THREE.GLTFLoader();

loader.load( 'assets/models/scene.gltf', function ( gltf ) {
   gltf.scene.rotation.y = -30;
   gltf.scene.position.y = 58;
   scene.add( gltf.scene );
}, undefined, function ( error ) {
   console.error( error );
} );

//CLOUD MODEL
let cloudLoader = new THREE.GLTFLoader();

cloudLoader.load( 'assets/models/clouds/scene.gltf', function ( cloudgltf ) {
   cloudgltf.scene.scale.set(0.2, 0.1, 0.2);
   cloudgltf.scene.position.y = 208;
   cloudgltf.scene.receiveShadow = true;
   scene.add( cloudgltf.scene );
}, undefined, function ( error1 ) {
   console.error( error1 );
   } );
   
let cloudLoader2 = new THREE.GLTFLoader();

cloudLoader2.load( 'assets/models/clouds/scene.gltf', function ( cloudgltf2 ) {
   cloudgltf2.scene.scale.set(0.2, 0.1, 0.2);
   cloudgltf2.scene.position.x = 28;
   cloudgltf2.scene.position.y = 188;
   cloudgltf2.scene.receiveShadow = true;
   scene.add( cloudgltf2.scene );
}, undefined, function ( error2 ) {
   console.error( error2 );
   } );


//PLANE MODEL
let planeLoader = new THREE.GLTFLoader();

planeLoader.load( 'assets/models/cartoon_plane/scene.gltf', function ( planeLoadergltf ) {
   scene.add( planeLoadergltf.scene );
   planeAnimation =  planeLoadergltf.scene;
   planeLoadergltf.scene.scale.set(0.2, 0.2, 0.2);
   planeLoadergltf.scene.position.x = 58;
   planeLoadergltf.scene.position.y = 228;

   planeLoadergltf.scene.receiveShadow = true;

}, undefined, function ( error3 ) {
   console.error( error3 );
   } );
   
   
//FLOOR Outside
textureFloorOutside = new THREE.TextureLoader().load( 'assets/textures/gray.jpg' );
meshFloorOutside = new THREE.Mesh(
   new THREE.PlaneGeometry(3000,3000,3000),
   new THREE.MeshPhongMaterial({map:textureFloorOutside, wireframe:USE_WIREFRAME})
);
meshFloorOutside.rotation.x -= Math.PI / 2;

meshFloorOutside.position.y += -0.1;
meshFloorOutside.receiveShadow = true;
scene.add(meshFloorOutside);

//RING SURROUND

let ringSurroundGeometry = new THREE.RingGeometry( 150, 160, 100 );
let ringSurroundmaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
let ringSurroundmesh = new THREE.Mesh( ringSurroundGeometry, ringSurroundmaterial );
ringSurroundmesh.position.y = 1;
ringSurroundmesh.rotation.x = 48.7;
scene.add( ringSurroundmesh );   

// RING INNER

TextureRingInner = new THREE.TextureLoader().load( 'assets/textures/blackn.jpg' );
let ringInnerGeometry = new THREE.TorusGeometry( 70,3,16,100 );
let ringInnermaterial = new THREE.MeshPhongMaterial( { map:TextureRingInner, wireframe:USE_WIREFRAME } );
let ringInnermesh = new THREE.Mesh( ringInnerGeometry, ringInnermaterial );
ringInnermesh.position.y = 50;

scene.add( ringInnermesh );


// RING OUTER
TextureRingOuter = new THREE.TextureLoader().load( 'assets/textures/blackn.jpg' );
let ringOuterGeometry = new THREE.TorusGeometry( 82,3,16,100 );
let ringOutermaterial = new THREE.MeshPhongMaterial( { map:TextureRingOuter, wireframe:USE_WIREFRAME } );
let ringOutermesh = new THREE.Mesh( ringOuterGeometry, ringOutermaterial );
ringOutermesh.position.y = 50;
ringOutermesh.rotation.x = 49.2;
scene.add( ringOutermesh );

   // TEXT FRONT

   let textFrontLoader = new THREE.FontLoader();
   textFrontLoader.load( 'assets/font/helvetiker_regular.typeface.json', function ( font ) {
   let textGeo = new THREE.TextGeometry( "Vague", {

         font: font,

         size: 30,
         height: 5,
         curveSegments: 3,
         

         bevelThickness: 0,
         bevelSize: 0,
         bevelEnabled: false

      } );

      let textMaterial = new THREE.MeshPhongMaterial( { color: 0x000000 } );

      let textMesh = new THREE.Mesh( textGeo, textMaterial );
      textMesh.position.set( 170, 0, 50 ); // z , y ,x 
      textMesh.rotation.x = 29.9;
   
      textMesh.rotation.z = 20.5;
      
      
      scene.add( textMesh ); 
   } );

   //TEXT BACK
   let textBackLoader = new THREE.FontLoader();

   textBackLoader.load( 'assets/font/helvetiker_regular.typeface.json', function ( font ) {
   
   let textGeo = new THREE.TextGeometry( "Vague", {

      font: font,

      size: 30,
      height: 5,
      curveSegments: 3,

      bevelThickness: 0,
      bevelSize: 0,
      bevelEnabled: false

      } );

      let textMaterials = new THREE.MeshPhongMaterial( { color: 0x000000 } );

      let textBackMesh = new THREE.Mesh( textGeo, textMaterials );
      textBackMesh.position.set( -165, 0, -60); // z , y ,x 
      textBackMesh.rotation.x = 29.825;

      textBackMesh.rotation.z = -20.5;
      
      
      scene.add( textBackMesh );
   
   } );

 
  // LIGHTS (ESSENTIAL FOR EACH OBJECT)
  ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);
 
  light = new THREE.PointLight(0xffffff, 0.8, 18);
  light.position.set(9,6,-1);
  light.castShadow = true;

  // Will not light anything closer than 0.1 units or further than 25 units
  
  light.shadow.camera.near = 10.1;
  light.shadow.camera.far = 25;
  scene.add(light);

  let spotLight = new THREE.SpotLight( 0xFFFFFF, 0.2);
  spotLight.position.set( 7, 200, 30 );
  spotLight.target.position.set( 10, -350, -55 );
  spotLight.castShadow = true;
  spotLight.position.z = 15;
  spotLight.position.x = 340;
  scene.add( spotLight.target );
  scene.add( spotLight );
  //Set up shadow properties for the spotLight
  spotLight.shadow.mapSize.width = 112; // default
  spotLight.shadow.mapSize.height = 212; // default
  spotLight.shadow.camera.near = 0.5; // default
  spotLight.shadow.camera.far = 1500; // default
 

  camera.position.set(100, player.height, -10);
  camera.lookAt(new THREE.Vector3(0,player.height,0));
  camera.position.y = 135;
 
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(1280, 720);

 
  // Enable Shadows in the Renderer
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
 
  document.body.appendChild(renderer.domElement);
  
   controls = new THREE.OrbitControls (camera);
  animate();



function animate(){
   ringInnermesh.rotation.y += 0.05;
   ringOutermesh.rotation.y += 0.05;

  
  requestAnimationFrame(animate);

  controls.update();

  if(keyboard[87]){ // W key
     camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
     camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[83]){ // S key
     camera.position.x += Math.sin(camera.rotation.y) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }
  if(keyboard[65]){ // A key
     camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
  }
  if(keyboard[68]){ // D key
     camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
     camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
  }
 
  if(keyboard[37]){ // left arrow key
     camera.rotation.y -= player.turnSpeed;
  }
  if(keyboard[39]){ // right arrow key
     camera.rotation.y += player.turnSpeed;
  }
 

  renderer.render(scene, camera);
}
 
function keyDown(event){
  keyboard[event.keyCode] = true;
}
 
function keyUp(event){
  keyboard[event.keyCode] = false;
}



window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);
