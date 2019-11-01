/* globals THREE */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import TweenMax from "gsap/TweenMax";

import initializeRenderer from "utils/initializeRenderer";
import { initializeArToolkit, getMarker } from "utils/arToolkit";

import marker from "static/hiro.png";

const { Camera, Group, Scene, AmbientLight, GLTFLoader } = THREE;

const useStyles = makeStyles(theme => ({
  markerSearchContainer: {
    position: "absolute",
    bottom: 160,
    left: 0,
    right: 0,
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  markerSearchContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "red",
    borderColor: "red",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 20,
    maxWidth: 200,
    padding: 10
  },
  markerSearchImage: {
    marginTop: 10,
    height: 100,
    width: 100
  }
}));

const ARViewer = props => {
  const classes = useStyles();

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

    var light = new AmbientLight(0x404040, 50); // white light
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load(
      props.modelURL,
      gltf => {
        // called when the resource is loaded
        gltf.scene.scale.set(0.005, 0.005, 0.005);
        TweenMax.from(gltf.scene.position, 3, {
          z: -8,
          yoyo: true,
          repeat: -1,
          ease: "Power2.easeInOut"
        });

        markerRoot.add(gltf.scene);
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
      {!markerFound && (
        <div className={classes.markerSearchContainer}>
          <div className={classes.markerSearchContent}>
            <Typography variant="h6">Looking for Marker</Typography>
            <img
              className={classes.markerSearchImage}
              alt="Marker Example"
              src={marker}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ARViewer;
