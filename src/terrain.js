import * as THREE from "three";

export function createTerrain(host) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
  } catch {
    return () => {};
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);
  host.classList.add("has-terrain");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 6, 13);
  camera.lookAt(0, 0.2, 0);
  const group = new THREE.Group();
  scene.add(group);
  const geometry = new THREE.PlaneGeometry(14, 10, 62, 44);
  geometry.rotateX(-Math.PI / 2);
  const vertices = geometry.attributes.position;
  for (let i = 0; i < vertices.count; i++) {
    const x = vertices.getX(i),
      z = vertices.getZ(i);
    const peak = (px, pz, h, spread) =>
      h * Math.exp(-((x - px) ** 2 + (z - pz) ** 2) / spread);
    const ridges =
      peak(-0.7, -1, 4.3, 3.8) + peak(-4, 0, 2.8, 3) + peak(3.2, -0.6, 3.5, 3);
    const detail =
      (Math.sin(x * 3.1 + z * 1.4) * Math.cos(z * 2.7 - x) * 0.22 +
        Math.sin(x * 7 + z * 5) * 0.09) *
      Math.min(ridges, 1);
    vertices.setY(i, ridges + detail - 1.8);
  }
  geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({
    color: 0x285a7d,
    roughness: 0.88,
    metalness: 0.1,
    flatShading: true,
    transparent: true,
    opacity: 0.94,
  });
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xa1d0e7,
    wireframe: true,
    transparent: true,
    opacity: 0.13,
  });
  const wire = new THREE.Mesh(geometry, wireMaterial);
  wire.position.y = 0.012;
  group.add(wire);
  scene.add(new THREE.HemisphereLight(0xe0f5ff, 0x143559, 2.8));
  const light = new THREE.DirectionalLight(0xf0faff, 3.6);
  light.position.set(-3, 8, 4);
  scene.add(light);
  let frame = 0,
    visible = true,
    targetX = 0,
    targetY = -0.09;
  const render = () => {
    frame = 0;
    if (!visible || document.hidden) return;
    group.rotation.y += (targetY - group.rotation.y) * 0.045;
    group.rotation.x += (targetX - group.rotation.x) * 0.045;
    renderer.render(scene, camera);
    if (
      Math.abs(targetY - group.rotation.y) +
        Math.abs(targetX - group.rotation.x) >
      0.0001
    )
      frame = requestAnimationFrame(render);
  };
  const request = () => {
    if (!frame) frame = requestAnimationFrame(render);
  };
  const resize = () => {
    if (!host.clientWidth || !host.clientHeight) return;
    renderer.setSize(host.clientWidth, host.clientHeight);
    camera.aspect = host.clientWidth / host.clientHeight;
    camera.updateProjectionMatrix();
    request();
  };
  const pointer = (e) => {
    if (e.pointerType === "touch") return;
    const b = host.getBoundingClientRect();
    targetY = ((e.clientX - b.left) / b.width) * 0.28 - 0.23;
    targetX = ((e.clientY - b.top) / b.height - 0.5) * 0.08;
    request();
  };
  const leave = () => {
    targetX = 0;
    targetY = -0.09;
    request();
  };
  const visibility = () => {
    if (!document.hidden) request();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) request();
  });
  io.observe(host);
  host.addEventListener("pointermove", pointer);
  host.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", visibility);
  resize();
  return () => {
    cancelAnimationFrame(frame);
    ro.disconnect();
    io.disconnect();
    host.removeEventListener("pointermove", pointer);
    host.removeEventListener("pointerleave", leave);
    document.removeEventListener("visibilitychange", visibility);
    geometry.dispose();
    material.dispose();
    wireMaterial.dispose();
    renderer.dispose();
    renderer.domElement.remove();
    host.classList.remove("has-terrain");
  };
}
