/* globals THREE */
import React from "react";

import { useTheme } from "@material-ui/styles";

// import TweenMax from "gsap/TweenMax";

import { useStyles } from "./styles";

const ViewGifts = () => {
  const classes = useStyles();
  const theme = useTheme();

  let canvas = null;

  React.useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setClearColor(new THREE.Color(theme.palette.background.paper));

    const parent = document.getElementById("vr");
    renderer.setSize(parent.clientWidth, parent.clientHeight);

    const resizeRenderer = () => {
      renderer.setSize(parent.clientWidth, parent.clientHeight);
    };
    window.addEventListener("resize", resizeRenderer);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 3;
    camera.lookAt(new THREE.Vector3(0, 0.6, 0.6));
    scene.add(camera);

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const cube1 = new THREE.Mesh(geometry, material);

    geometry = new THREE.BoxGeometry(1.2, 0.6, 1.2);
    const cube2 = new THREE.Mesh(geometry, material);
    cube2.position.set(0, 0.6, 0);

    geometry = new THREE.TetrahedronBufferGeometry(0.3);
    const top1 = new THREE.Mesh(geometry, material);
    top1.position.set(-0.2, 1.2, 0.2);

    geometry = new THREE.TetrahedronBufferGeometry(0.4);
    const top2 = new THREE.Mesh(geometry, material);
    top2.position.set(0.2, 1.25, -0.2);

    const templateGift = new THREE.Group();
    templateGift.add(cube1);
    templateGift.add(cube2);
    templateGift.add(top1);
    templateGift.add(top2);

    let gifts = [];

    let gift = templateGift.clone();
    gift.scale.set(0.3, 0.3, 0.3);
    gift.position.set(0, 3.25, 0);
    gifts.push(gift);

    gift = templateGift.clone();
    gift.scale.set(0.5, 0.5, 0.5);
    gift.position.set(-0.8, 2.2, 0);
    gifts.push(gift);

    gift = templateGift.clone();
    gift.scale.set(0.5, 0.5, 0.5);
    gift.position.set(0.8, 2.2, 0);
    gifts.push(gift);

    gift = templateGift.clone();
    gift.scale.set(0.75, 0.75, 0.75);
    gift.position.set(-2.2, 0, 0);
    gifts.push(gift);

    gift = templateGift.clone();
    gift.scale.set(0.75, 0.75, 0.75);
    gift.position.set(2.2, 0, 0);
    gifts.push(gift);

    gift = templateGift.clone();
    gift.scale.set(0.7, 0.7, 0.7);
    gift.position.set(-1.2, -2.5, 0);
    gifts.push(gift);

    gift = templateGift.clone();
    gift.scale.set(0.7, 0.7, 0.7);
    gift.position.set(1.2, -2.5, 0);
    gifts.push(gift);

    gift = templateGift.clone();
    gift.scale.set(0.6, 0.6, 0.6);
    gift.position.set(0, -5.25, 0);
    gifts.push(gift);

    gifts.push(templateGift);

    gifts.forEach(gift => {
      scene.add(gift);
    });

    const animate = () => {
      requestAnimationFrame(animate);

      gifts.forEach(gift => {
        gift.rotation.z += 0.02;
        gift.rotation.x += 0.02;
        gift.rotation.y += 0.02;
      });

      renderer.render(scene, camera);
    };
    animate();

    // eslint-disable-next-line
  }, []);

  const storeRef = node => {
    canvas = node;
  };

  return <canvas className={classes.canvas} ref={storeRef} />;
};

export default ViewGifts;
