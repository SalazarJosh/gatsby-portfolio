import React, {Component} from "react";
import Delaunator from "delaunator";
import * as THREE from "three";

class HomepageHeader extends Component {
  constructor(){
    super();
    this.state ={
      selectedGradient: 0
    }
  }
  
  toggleSelectedGradient(clickedGradient){
    this.setState({
      selectedGradient: clickedGradient
    })
    this.init(clickedGradient);
  }
   
  componentDidMount(){
    let camera,
      scene,
      renderer;
    
    //Mouse variables for mouse light positioning
    var mouse = {
      x: 0,
      y: 0
    };
    
    var selectedGradient;
    
    const mouseLight = new THREE.PointLight(0xcccccc, 1, 300);
    var mouseLightHeight = 20;
    
    var headerContainer = document.getElementById("headerContainer");
    
    this.init = (clickedGradient) => {
      var headerCanvas = document.getElementById("headerCanvas");
      if(headerCanvas != null){
        headerCanvas.remove();
      }
      // SETUP
      // ======================
      headerContainer = document.getElementById("headerContainer");
      camera = new THREE.PerspectiveCamera(5, headerContainer.offsetWidth / headerContainer.offsetHeight, 1, 10000);
      camera.position.z = 1800 - (camera.aspect * 200);
    
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
    
      // LIGHTS
      // ======================
      const light = new THREE.DirectionalLight(0xcccccc);
      light.position.set(0, 0, 1);
      scene.add(light);
    
      mouseLight.position.set(-50, 10, mouseLightHeight);
      scene.add(mouseLight);
    
      // point light helper
      //const sphereSize = 1;
      //const pointLightHelper = new THREE.PointLightHelper(mouseLight, sphereSize);
      //scene.add(pointLightHelper);
    
      // TEMPORARY CANVAS
      // this is the canvas for mapping the gradient
      // ======================
      const tempCanvas = document.createElement('canvas');
      var ctx = tempCanvas.getContext("2d");
    
      const width = headerContainer.offsetWidth;
      const height = headerContainer.offsetWidth;
    
      const halfWidth = Math.floor(width * 0.5);
    
      const gradientRange = Math.sqrt(width ** 2 + height ** 2);
    
      // Size the canvas to match viewport
      tempCanvas.width = width;
      tempCanvas.height = height;
    
      var grd = ctx.createRadialGradient(THREE.Math.randFloat(-halfWidth / 2, halfWidth / 2) + halfWidth, height, THREE.Math.randFloat(5, 100), halfWidth, height, gradientRange);
      // Create a set of RANDOM gradients for the fill
      // var firstColorR = Math.floor(Math.random() * 255);
      // var firstColorG = Math.floor(Math.random() * 255);
      // var firstColorB = Math.floor(Math.random() * 255);
      // 
      // var numOfGradientBands = Math.floor(THREE.Math.randFloat(2, 4));
      // grd.addColorStop(.25, "rgb(" + firstColorR + "," + firstColorG + ", " + firstColorB);
      // if(numOfGradientBands == 3){
      //   grd.addColorStop(.35, "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255));
      // }
      // grd.addColorStop(.45, "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255));
      //document.documentElement.style.setProperty("--brandColor", "rgba(" + firstColorR + "," + firstColorG + ", " + firstColorB + ", 1)");
       
      // Create a set of  gradients for the fill
      var gradients = [[73,50,64, 255, 0, 153], [51, 51, 51, 221, 24, 24], [75,19,79,201,75,75], [0,0,70,28,181,224], [15,52,67,52,232,158], [60,16,83,173,83,137]];
      
      if(clickedGradient !== undefined){
        selectedGradient = clickedGradient;
      }
      else{
        selectedGradient = Math.floor(Math.random() * gradients.length);
      }
      grd.addColorStop(.25, "rgb(" + gradients[selectedGradient][0] + "," + gradients[selectedGradient][1] + ", " + gradients[selectedGradient][2]);
      grd.addColorStop(.45, "rgb(" + gradients[selectedGradient][3] + "," + gradients[selectedGradient][4] + ", " + gradients[selectedGradient][5]);
      
      document.documentElement.style.setProperty("--brandColor", "rgba(" + gradients[selectedGradient][3] + "," + gradients[selectedGradient][4] + ", " + gradients[selectedGradient][5] + ", 1)");
      
      var gradientElements = document.getElementsByClassName("gradientOverlay");
      for (var i = 0; i < gradientElements.length; i++) {
        gradientElements[i].style.opacity = '1';
      }
      
      // Render gradient across whole fill covering canvas
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);
    
      var pixels = [];
    
      // Map the pixel data (RGB) to an array
      for (var a = 1; a < 33; a++) {
        for (var b = 1; b < 33; b++) {
          var pixel = ctx.getImageData((tempCanvas.width / 32) * a, (tempCanvas.height / 32) * b, 1, 1).data;
          pixels.push(pixel);
        }
      }
    
      // * For debugging, render the gradient canvas to see the gradient
      //document.body.appendChild(tempCanvas);
    
      // GENERATE LOW-POLY MESH
      // ======================
    
      var points3d = [];
    
      const visibleHeightAtZDepth = (depth, camera) => {
        // compensate for cameras not positioned at z=0
        const cameraOffset = camera.position.z;
        if (depth < cameraOffset) 
          depth -= cameraOffset;
        else 
          depth += cameraOffset;
        
        // vertical fov in radians
        const vFOV = camera.fov * Math.PI / 180;
    
        // Math.abs to ensure the result is always positive
        return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
      };
    
      const visibleWidthAtZDepth = (depth, camera) => {
        const height = visibleHeightAtZDepth(depth, camera);
        return height * camera.aspect;
      };
    
      var visibleWidth = visibleWidthAtZDepth( camera.position.z, camera);
      if(visibleWidth < 800){
        visibleWidth = 500
      }
      
      var variance = THREE.Math.randFloat(1, 10);
      // generate 1024 verticies (32 * 32)
      for (let i = 1; i < 33; i++) {
        for (let j = 1; j < 33; j++) {
          // width/height of screen / 32 segents * index / 5 (used to scale the mesh. Larger values = smaller mesh)
          let x = (visibleWidth / 32) * i + THREE.Math.randFloatSpread(variance);
          let z = (visibleWidth / 32) * j + THREE.Math.randFloatSpread(variance);
          let y = THREE.Math.randFloatSpread(4);
          points3d.push(new THREE.Vector3(x, y, z));
        }
      }
    
      var geometry1 = new THREE.BufferGeometry().setFromPoints(points3d);
    
      // DELAUNAY / APPLY FACES TO MESH
      // ======================
    
      // triangulate x, z
      var indexDelaunay = Delaunator.from(points3d.map(v => {
        return [v.x, v.z];
      }));
    
      // delaunay index => three.js index
      var meshIndex = [];
      for (let i = 0; i < indexDelaunay.triangles.length; i++) {
        meshIndex.push(indexDelaunay.triangles[i]);
      }
    
      // add three.js index to the existing geometry
      geometry1.setIndex(meshIndex);
      geometry1.computeVertexNormals();
    
      // get the geometry points using attributes.position.count
      const count = geometry1.attributes.position.count;
      // assign a color attribute to geometry points
      geometry1.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    
      const color = new THREE.Color();
      const colors1 = geometry1.attributes.color;
    
      // Generate color
      //color1 = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255);
    
      for (let i = 0; i < count; i++) {
        color.setRGB(pixels[i][0] / 255, pixels[i][1] / 255, pixels[i][2] / 255);
    
        colors1.setXYZ(i, color.r, color.g, color.b);
      }
    
      const texture = new THREE.TextureLoader().load("noise.png");
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(100, 100);
    
      var mesh = new THREE.Mesh(geometry1, new THREE.MeshPhongMaterial({color: 0xffffff, opacity: 1, vertexColors: true, flatShading: true, shininess: 30}));
      mesh.rotation.x = Math.PI / 2;
      mesh.position.y = 200;
      mesh.position.x -= visibleWidth / 2.5;
      mesh.scale.set(.8,.8,.8);
      scene.add(mesh);
    
      const noisePlaneGeom = new THREE.PlaneGeometry(1000, 1000);
      const noisePlaneMat = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, map: texture, opacity: .5});
      const noisePlane = new THREE.Mesh(noisePlaneGeom, noisePlaneMat);
      noisePlane.position.z = 8;
      scene.add(noisePlane);
    
      var wireMesh = new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial({color: 0xeeeeee, opacity: .2, transparent: true, wireframe: true, shininess: 0}));
      wireMesh.rotation.x = Math.PI / 2;
      wireMesh.position.z = 2;
      wireMesh.position.y = 200;
      wireMesh.position.x -= visibleWidth / 2.5;
      wireMesh.scale.set(.8,.8,.8);
      scene.add(wireMesh);
      
    
      renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(headerContainer.offsetWidth, headerContainer.offsetHeight);
      var canvas = renderer.domElement;
      canvas.id = "headerCanvas";
      headerContainer.appendChild(canvas);
    
      // * DEBUG enable orbit controls
      //var controls = new THREE.OrbitControls(camera, canvas);
    
      document.addEventListener('mousemove', onDocumentMouseMove);
    
      window.addEventListener('resize', onWindowResize);
      animate();
    
    }
    
    function onWindowResize() {
    
      camera.aspect = headerContainer.offsetWidth / headerContainer.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(headerContainer.offsetWidth, headerContainer.offsetHeight);
    }
    
    function onDocumentMouseMove(event) {
      // Update the mouse variable
      event.preventDefault();
      mouse.x = (event.clientX / headerContainer.offsetWidth) * 2 - 1;
      mouse.y = -(event.clientY / headerContainer.offsetHeight) * 2 + 1.5;
    
      // Make the sphere follow the mouse
      var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      var dir = vector.sub(camera.position).normalize();
      var distance = -camera.position.z / dir.z;
      var pos = camera.position.clone().add(dir.multiplyScalar(distance));
      mouseLight.position.copy(pos);
      mouseLight.position.z = mouseLightHeight;
    }
    
    //
    
    function animate() {
    
      requestAnimationFrame(animate);
    
      render();
    
    }
    
    function render() {
    
      camera.lookAt(scene.position);
    
      renderer.render(scene, camera);
    
    }
    this.init();
    console.log("selectedGradient " + selectedGradient)
    this.setState({
      selectedGradient: selectedGradient
    })
    console.log(this.state);
  }
  
  render() {
    console.log(this.state.selectedGradient);
    return (
      <> 
        <div className = "headerContainer" id = "headerContainer" >
          <h1 className="headerName">Salazar</h1>
        </div>
        <div className="columns is-mobile">
          <div className="column">
            <div className="gradientContainer">
              <div className="pointer gradient1" onClick={() => this.toggleSelectedGradient(0)}>
                <div className={"gradientOverlay" + (this.state.selectedGradient === 0 ? "" : " inactiveGradient")}></div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="gradientContainer">
              <div className="pointer gradient2" onClick={() => this.toggleSelectedGradient(1)}>
                <div className={"gradientOverlay" + (this.state.selectedGradient === 1 ? "" : " inactiveGradient")}></div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="gradientContainer">
              <div className="pointer gradient3" onClick={() => this.toggleSelectedGradient(2)}>
                <div className={"gradientOverlay" + (this.state.selectedGradient === 2 ? "" : " inactiveGradient")}></div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="gradientContainer">
              <div className="pointer gradient4" onClick={() => this.toggleSelectedGradient(3)}>
                <div className={"gradientOverlay" + (this.state.selectedGradient === 3 ? "" : " inactiveGradient")}></div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="gradientContainer">
              <div className="pointer gradient5" onClick={() => this.toggleSelectedGradient(4)}>
                <div className={"gradientOverlay" + (this.state.selectedGradient === 4 ? "" : " inactiveGradient")}></div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="gradientContainer">
              <div className="pointer gradient6" onClick={() => this.toggleSelectedGradient(5)}>
                <div className={"gradientOverlay" + (this.state.selectedGradient === 5 ? "" : " inactiveGradient")}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer-md"></div>
        <div className="columns">
          <div class="column work">
            <p>Accessibility</p>
          </div>
          <div class="column work">
            <p>Development</p>
          </div>
          <div class="column work">
            <p>Design</p>
          </div>
        </div>
      </>
    )
  }
}
export default HomepageHeader;