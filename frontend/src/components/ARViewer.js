/* globals Hammer, THREE */
import React from "react";

// import degToRad from "utils/degToRad";
import initializeRenderer from "utils/initializeRenderer";
import { initializeArToolkit, getMarker } from "utils/arToolkit";

import model from "static/dog.obj";

const { Camera, Group, Scene, OBJLoader } = THREE;

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

    // const geometry = new PlaneGeometry(1, 1, 1);
    // const loader = new TextureLoader();
    // loader.crossOrigin = "";

    // let img = loader.load(props.image);
    // let material = new MeshPhongMaterial({
    //   color: 0xffffff,
    //   map: img,
    //   side: DoubleSide
    // });

    // let mesh = new Mesh(geometry, material);
    // mesh.position.x = geometry.parameters.width * 2;
    // mesh.position.z = geometry.parameters.height;
    // mesh.rotation.x = -Math.PI / 2; // -90°
    // mesh.scale.x = 2;
    // mesh.scale.y = 2;

    // let mesh = null;
    //TODO: ADD CUSTOM HERE

    var loader = new OBJLoader();
    // loader.setPath("static/");

    // load a resource
    loader.load(
      // resource URL
      "http://localhost:5000/dog.obj",
      // called when resource is loaded
      object => {
        // scene.add(object);
        scene.add(object);
      },
      // called when loading is in progresses
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      () => {
        console.log("An error happened");
      }
    );

    // new THREE.MTLLoader()
    // .setPath( 'models/' )
    // .load( 'fish-2.mtl', function ( materials ) {
    // 	materials.preload();
    // 	new THREE.OBJLoader()
    // 		.setMaterials( materials )
    // 		.setPath( 'models/' )
    // 		.load( 'fish-2.obj', function ( group ) {
    // 			mesh0 = group.children[0];
    // 			mesh0.material.side = THREE.DoubleSide;
    // 			mesh0.position.y = 0.25;
    // 			mesh0.scale.set(0.25,0.25,0.25);
    // 			markerRoot1.add(mesh0);
    // 		}, onProgress, onError );
    // });

    // markerRoot.add(mesh);

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
