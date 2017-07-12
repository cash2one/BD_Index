export var scene = new THREE.Scene;
scene.fog = new THREE.Fog(0x000, 50, 80 );

export var camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

