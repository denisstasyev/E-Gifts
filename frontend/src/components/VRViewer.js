/* globals THREE */
import React from "react";

const { Camera, Group, Scene, AmbientLight, GLTFLoader } = THREE;

const VRViewer = props => {
  let canvas = null;

  React.useEffect(() => {
    const renderer = new WebGLRenderer({ alpha: true, canvas });
    renderer.setClearColor(new Color("lightgrey"), 0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new Scene();
    const camera = new Camera();
    scene.add(camera);

    const onRenderFcts = [];

    var light = new AmbientLight(0x404040, 50); // white light
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load(
      props.modelURL,
      gltf => {
        // called when the resource is loaded
        gltf.scene.scale.set(0.005, 0.005, 0.005);
        scene.add(gltf.scene);
      },
      xhr => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total) * 100}% of the model loaded`);
      },
      error => {
        // called when loading has errors
        console.error("An error happened", error);
      }
    );

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

  return <canvas ref={storeRef} />;
};

export default VRViewer;
