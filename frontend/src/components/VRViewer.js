/* globals THREE */
import React from "react";

import TweenMax from "gsap/TweenMax";

const {
  WebGLRenderer,
  Color,
  // Camera,
  PerspectiveCamera,
  // Group,
  Scene,
  AmbientLight,
  GLTFLoader,
  OrbitControls
} = THREE;

const VRViewer = props => {
  let canvas = null;

  React.useEffect(() => {
    const renderer = new WebGLRenderer({ canvas });
    renderer.setClearColor(new Color("lightgrey"));
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(400, 400);

    const scene = new Scene();
    // const camera = new Camera();
    const camera = new PerspectiveCamera(
      65,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 4;
    camera.position.y = 3;
    camera.position.x = 3;
    scene.add(camera);

    var light = new AmbientLight(0x404040, 50); // white light
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load(
      props.modelURL,
      gltf => {
        // called when the resource is loaded
        gltf.scene.scale.set(0.005, 0.005, 0.005);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        TweenMax.from(gltf.scene.position, 3, {
          y: -10,
          yoyo: false,
          repeat: 0,
          ease: "Power2.easeInOut"
        });

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

    const onRenderFcts = [];

    // render the scene
    onRenderFcts.push(() => {
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

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.3;
    controls.zoomSpeed = 0.9;
    controls.minDistance = 3;
    controls.maxDistance = 20;
    controls.minPolarAngle = 0; // radians
    controls.maxPolarAngle = Math.PI / 2; // radians
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    onRenderFcts.push(() => {
      controls.update();
    });

    // eslint-disable-next-line
  }, []);

  const storeRef = node => {
    canvas = node;
  };

  return <canvas ref={storeRef} />;
};

export default VRViewer;
