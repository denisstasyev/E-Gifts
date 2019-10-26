/* globals THREE */
import React from "react";

import initializeRenderer from "utils/initializeRenderer";
import { initializeArToolkit, getMarker } from "utils/arToolkit";

const {
  Camera,
  Group,
  Scene,
  // MTLLoader,
  OBJLoader
  // FBXLoader,
  // GLTFLoader
} = THREE;

//TODO
// eslint-disable-next-line
const ARViewer = props => {
  const [markerFound, setMarkerFound] = React.useState(false);

  let canvas = null;

  React.useEffect(() => {
    const renderer = initializeRenderer(canvas);

    const scene = new Scene();
    const camera = new Camera();
    scene.add(camera);

    const markerRoot = new Group();
    scene.add(markerRoot);

    const onRenderFcts = [];
    const arToolkitContext = initializeArToolkit(
      renderer,
      camera,
      onRenderFcts
    );
    const marker = getMarker(arToolkitContext, markerRoot);

    marker.addEventListener("markerFound", () => {
      setMarkerFound(true);
    });

    // // load a resource
    // let loader = new OBJLoader();
    // loader.setPath("http://localhost:5000/").load(
    //   // resource URL
    //   "dog.obj",
    //   // called when resource is loaded
    //   object => {
    //     // scene.add(object);
    //     object.scale.set(0.1, 0.1, 0.1);
    //     object.rotation.y = Math.PI / 2; // -90°
    //     markerRoot.add(object);
    //   },
    //   // called when loading is in progresses
    //   xhr => {
    //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //   },
    //   // called when loading has errors
    //   () => {
    //     console.log("An error with AR happened");
    //   }
    // );

    // // load a resource
    // let mtlLoader = new MTLLoader();
    // mtlLoader.setPath("http://localhost:5000/");
    // mtlLoader.load(
    //   "dog.mtl",
    //   materials => {
    //   materials.preload();
    let objLoader = new OBJLoader();
    // // objLoader.setMaterials(materials);
    objLoader.setPath("http://localhost:5000/");
    objLoader.load(
      // resource URL
      "dog.obj",
      // called when resource is loaded
      object => {
        object.scale.set(0.1, 0.1, 0.1);
        object.rotation.x = -Math.PI / 2; // -90°
        object.rotation.z = Math.PI;
        markerRoot.add(object);
      },
      // called when loading is in progresses
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + "% OBJ loaded");
      },
      // called when loading has errors
      () => {
        console.log("An error with AR OBJ happened");
      }
    );
    //   },
    //   // called when loading is in progresses
    //   xhr => {
    //     console.log((xhr.loaded / xhr.total) * 100 + "% MTL loaded");
    //   },
    //   // called when loading has errors
    //   () => {
    //     console.log("An error with AR MTL happened");
    //   }
    // );

    // var loader = new GLTFLoader().setPath("http://localhost:5000/");
    // loader.load("scene.gltf", function(gltf) {
    //   // gltf.scene.traverse(function(child) {
    //   //   if (child.isMesh) {
    //   //     child.material.envMap = envMap;
    //   //   }
    //   // });
    //   gltf.scene.scale.x = 0.1; //set(0.1, 0.1, 0.1);
    //   gltf.scene.scale.y = 0.1;
    //   gltf.scene.scale.z = 0.1;
    //   markerRoot.add(gltf.scene);
    //   // scene.add(gltf.scene);
    // });

    // // model
    // let loader = new FBXLoader();
    // loader.load("http://localhost:5000/BMW.fbx", object => {
    //   let mixer = new THREE.AnimationMixer(object);
    //   let action = mixer.clipAction(object.animations[0]);
    //   action.play();
    //   object.traverse(child => {
    //     if (child.isMesh) {
    //       child.castShadow = true;
    //       child.receiveShadow = true;
    //     }
    //   });
    //   markerRoot.add(object);
    // });

    // var loader = new GLTFLoader();
    // loader.load("http://localhost:5000/bus_body_green.glb", function(gltf) {
    //   // var scale = 5.6;
    //   let model = gltf.scene.children[0];
    //   // bus.body.name = "body";
    //   // bus.body.rotation.set(0, -1.5708, 0);
    //   // bus.body.scale.set(scale, scale, scale);
    //   // bus.body.position.set(0, 3.6, 0);
    //   // bus.body.castShadow = true;
    //   // bus.frame.add(bus.body);
    //   markerRoot.add(model);
    // });

    // render the scene
    onRenderFcts.push(function() {
      renderer.render(scene, camera);
    });

    // run the rendering loop
    let lastTimeMsec = null;

    const animate = nowMsec => {
      // keep looping
      requestAnimationFrame(animate);
      // measure time
      lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
      const deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
      lastTimeMsec = nowMsec;
      // call each update function
      onRenderFcts.forEach(onRenderFct => {
        onRenderFct(deltaMsec / 1000, nowMsec / 1000);
      });
    };
    requestAnimationFrame(animate);

    // const root = document.getElementById("root");
    // const hammer = new Hammer(root);

    // hammer.get("pinch").set({ enable: true });
    // hammer.get("rotate").set({ enable: true });
    // hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });

    // let panStartX, panStartY;

    // hammer.on("panstart", function(ev) {
    //   panStartX = mesh.position.x;
    //   panStartY = mesh.position.z;

    //   mesh.position.x += ev.deltaX / 200;
    //   mesh.position.z += ev.deltaY / 200;
    // });

    // hammer.on("panmove", function(ev) {
    //   mesh.position.x = panStartX + ev.deltaX / 200;
    //   mesh.position.z = panStartY + ev.deltaY / 200;
    // });

    // let pinchStartX, pinchStartY;

    // hammer.on("pinchstart", function(ev) {
    //   pinchStartX = mesh.scale.x;
    //   pinchStartY = mesh.scale.y;
    //   mesh.scale.x = ev.scale;
    //   mesh.scale.y = ev.scale;
    // });

    // hammer.on("pinch", function(ev) {
    //   mesh.scale.x = pinchStartX * ev.scale;
    //   mesh.scale.y = pinchStartY * ev.scale;
    // });

    // let rotateStart;

    // hammer.on("rotatestart", function(ev) {
    //   rotateStart = mesh.rotation.z + degToRad(ev.rotation); // the first rotation is the angle between the two finger ignoring it.
    // });

    // hammer.on("rotatemove", function(ev) {
    //   mesh.rotation.z = rotateStart - degToRad(ev.rotation);
    // });

    // eslint-disable-next-line
  }, []);

  const storeRef = node => {
    canvas = node;
  };

  return (
    <div>
      <canvas ref={storeRef} />
      {!markerFound && <div>Looking for marker</div>}
    </div>
  );
};

export default ARViewer;
