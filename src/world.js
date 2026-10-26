import * as THREE from "three";
import { gsap } from "gsap";

// A small, self-contained world. Geometry is generated locally; no model downloads.
export function createHomeWorld(host, { onFocus, onInteract, onError, initialFocus = 0 } = {}) {
  const coarse = matchMedia("(pointer: coarse)").matches;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, coarse ? 1.35 : 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 60);
  camera.position.set(7, 5.8, 9);
  camera.lookAt(0, 1.1, 0);
  const world = new THREE.Group();
  scene.add(world);
  const parts = {};
  ["base", "walls", "joinery", "roof", "garden", "pins"].forEach((key) => {
    parts[key] = new THREE.Group();
    world.add(parts[key]);
  });
  const geometries = new Set(), materials = new Set();
  const mat = (color, extra = {}) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness: 0.8, ...extra });
    materials.add(m);
    return m;
  };
  const palette = {
    stone: mat("#91a59d"), edge: mat("#405b57"), cream: mat("#e7e5d7"),
    wood: mat("#bd8f5f"), darkwood: mat("#755138"), roof: mat("#244847", { metalness: 0.22, roughness: 0.5 }),
    glass: mat("#649b9b", { metalness: 0.45, roughness: 0.18, emissive: "#bc863b", emissiveIntensity: 0.06 }),
    black: mat("#18332f"), leaf: mat("#38695b", { flatShading: true }), leafLight: mat("#608875", { flatShading: true }),
    gravel: mat("#b7b9a6"), brass: mat("#c9a666", { metalness: 0.6, roughness: 0.3 }),
  };
  const geometry = (g) => { geometries.add(g); return g; };
  const cube = geometry(new THREE.BoxGeometry(1, 1, 1));
  function mesh(g, m, parent, x, y, z, sx = 1, sy = 1, sz = 1) {
    const o = new THREE.Mesh(g, m);
    o.position.set(x, y, z);
    o.scale.set(sx, sy, sz);
    o.castShadow = true;
    o.receiveShadow = true;
    parent.add(o);
    return o;
  }
  const box = (parent, m, x, y, z, sx, sy, sz) => mesh(cube, m, parent, x, y, z, sx, sy, sz);
  // Floating site model, with a cedar deck and a simple stone approach.
  box(parts.base, palette.edge, 0, -0.09, 0, 5.7, 0.28, 4.5);
  box(parts.base, palette.stone, 0, 0.09, 0, 5.7, 0.1, 4.5);
  box(parts.base, palette.cream, 0, 0.23, -0.25, 3.4, 0.2, 2.75);
  box(parts.base, palette.darkwood, 0.18, 0.25, 1.35, 3.75, 0.2, 1);
  for (let i = 0; i < 22; i++) box(parts.joinery, i % 3 ? palette.wood : palette.darkwood, -1.62 + i * 0.17, 0.37, 1.35, 0.16, 0.055, 1);
  box(parts.base, palette.gravel, -0.05, 0.14, 1.95, 1.1, 0.1, 0.45);
  box(parts.base, palette.gravel, -0.05, 0.11, 2.2, 1.25, 0.08, 0.18);
  // Walls are separated into components so the model can open up into layers.
  box(parts.walls, palette.cream, 0, 1.25, -0.25, 3.25, 1.85, 2.6);
  // Slatted front facade and a second, lower volume on the side.
  for (let i = 0; i < 16; i++) box(parts.walls, i % 4 ? palette.wood : palette.darkwood, 0, 0.4 + i * 0.112, 1.07, 3.29, 0.09, 0.08);
  box(parts.walls, palette.cream, 1.98, 0.93, -0.45, 0.72, 1.2, 2.1);
  box(parts.roof, palette.roof, 2.03, 1.57, -0.45, 0.9, 0.13, 2.3);
  // Tall glazed windows, deep frames and a real opening door.
  function frontWindow(x, y, width, height, z = 1.13) {
    box(parts.joinery, palette.black, x, y, z, width + 0.11, height + 0.11, 0.1);
    box(parts.joinery, palette.glass, x, y, z + 0.06, width, height, 0.035);
    box(parts.joinery, palette.cream, x, y, z + 0.09, 0.035, height, 0.025);
    box(parts.joinery, palette.cream, x, y, z + 0.09, width, 0.035, 0.025);
  }
  frontWindow(-0.98, 1.28, 0.72, 1.16);
  frontWindow(1.02, 1.28, 0.72, 1.16);
  const door = new THREE.Group();
  door.position.set(-0.33, 0.38, 1.15);
  parts.joinery.add(door);
  box(door, palette.roof, 0.33, 0.72, 0, 0.66, 1.44, 0.1);
  box(door, palette.glass, 0.33, 0.99, 0.06, 0.39, 0.6, 0.035);
  box(door, palette.brass, 0.56, 0.64, 0.09, 0.035, 0.17, 0.04);
  for (const z of [-0.9, 0.15]) {
    box(parts.joinery, palette.black, -1.66, 1.26, z, 0.07, 1.06, 0.78);
    box(parts.joinery, palette.glass, -1.7, 1.26, z, 0.035, 0.92, 0.64);
    box(parts.joinery, palette.cream, -1.73, 1.26, z, 0.02, 0.92, 0.035);
  }
  box(parts.joinery, palette.black, 2.36, 0.94, -0.45, 0.035, 0.72, 1.53);
  box(parts.joinery, palette.glass, 2.39, 0.94, -0.45, 0.02, 0.63, 1.4);
  // Gable prism and two standing-seam roof planes.
  const triangle = new THREE.Shape();
  triangle.moveTo(-1.625, 0); triangle.lineTo(0, 1.18); triangle.lineTo(1.625, 0); triangle.closePath();
  const gable = geometry(new THREE.ExtrudeGeometry(triangle, { depth: 2.6, bevelEnabled: false }));
  mesh(gable, palette.wood, parts.roof, 0, 2.17, -1.55);
  const angle = Math.atan2(1.27, 1.8), slope = Math.hypot(1.8, 1.27);
  for (const sign of [-1, 1]) {
    const roof = box(parts.roof, palette.roof, sign * 0.9, 2.79, -0.25, slope, 0.12, 3.02);
    roof.rotation.z = -sign * angle;
    for (let i = 0; i < 11; i++) {
      const seam = box(parts.roof, palette.edge, sign * 0.9, 2.87, -1.7 + i * 0.29, slope, 0.035, 0.025);
      seam.rotation.z = -sign * angle;
    }
  }
  box(parts.roof, palette.roof, 0, 3.43, -0.25, 0.12, 0.08, 3.08);
  box(parts.roof, palette.edge, 0.8, 3.1, -0.95, 0.3, 0.78, 0.36);
  box(parts.roof, palette.roof, 0.8, 3.53, -0.95, 0.4, 0.1, 0.46);
  frontWindow(0, 2.54, 0.55, 0.46, 1.1);
  // Porch railing and a built-in bench.
  for (const x of [-1.61, 1.96]) {
    for (const z of [0.95, 1.8]) box(parts.joinery, palette.darkwood, x, 0.73, z, 0.07, 0.73, 0.07);
    box(parts.joinery, palette.wood, x, 1.12, 1.38, 0.1, 0.06, 0.95);
  }
  box(parts.joinery, palette.wood, 1.12, 0.66, 1.6, 0.9, 0.08, 0.33);
  for (const x of [0.76, 1.48]) box(parts.joinery, palette.darkwood, x, 0.48, 1.6, 0.06, 0.3, 0.25);
  const cone = geometry(new THREE.ConeGeometry(1, 1, 7));
  const trunk = geometry(new THREE.CylinderGeometry(0.06, 0.09, 1, 6));
  for (const [x, z, size] of [[-2.35, -1.35, 1.12], [-2.35, -0.2, 0.7], [2.35, -1.75, 0.68]]) {
    mesh(trunk, palette.darkwood, parts.garden, x, 0.55 * size, z, 1, size, 1);
    for (let level = 0; level < 3; level++) {
      const s = (0.6 - level * 0.12) * size;
      mesh(cone, level % 2 ? palette.leafLight : palette.leaf, parts.garden, x, (0.85 + level * 0.38) * size, z, s, 0.85 * size, s);
    }
  }
  const rock = geometry(new THREE.DodecahedronGeometry(1, 0));
  for (const [x, z, s] of [[-2.1, 1.45, 0.24], [-2.45, 1.25, 0.16], [2.55, 1.25, 0.23]]) mesh(rock, palette.gravel, parts.garden, x, 0.2, z, s, s * 0.7, s);
  // Selectable, oversized raycast targets also have ordinary HTML button equivalents.
  const hotspots = [], hotspotMat = mat("#f8e9bf", { emissive: "#d9b46c", emissiveIntensity: 0.4 });
  const pinGeometry = geometry(new THREE.SphereGeometry(0.085, 12, 8));
  const ringGeometry = geometry(new THREE.TorusGeometry(0.16, 0.018, 6, 24));
  [[0.36, 1.05, 1.36], [-1.66, 1.6, 0.3], [1.8, 0.95, 1.62], [0.95, 2.83, 0.3]].forEach((p, i) => {
    const pin = mesh(pinGeometry, hotspotMat, parts.pins, ...p);
    pin.userData.focus = i;
    const ring = mesh(ringGeometry, hotspotMat, parts.pins, ...p);
    ring.userData.focus = i;
    hotspots.push(pin, ring);
  });
  // Contact shadow stays under the floating model without a full-screen postprocessing pass.
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = shadowCanvas.height = 128;
  const context = shadowCanvas.getContext("2d");
  const gradient = context.createRadialGradient(64, 64, 8, 64, 64, 64);
  gradient.addColorStop(0, "rgba(4,25,23,.38)"); gradient.addColorStop(1, "rgba(4,25,23,0)");
  context.fillStyle = gradient; context.fillRect(0, 0, 128, 128);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false });
  materials.add(shadowMat);
  const shadow = mesh(geometry(new THREE.PlaneGeometry(8.7, 7.5)), shadowMat, scene, 0, -0.39, 0);
  shadow.rotation.x = -Math.PI / 2; shadow.castShadow = shadow.receiveShadow = false;
  const ambient = new THREE.HemisphereLight(0xecfff7, 0x45635b, 2.5);
  const sun = new THREE.DirectionalLight(0xffe9cc, 3.8);
  sun.position.set(-3, 7, 5); sun.castShadow = true;
  sun.shadow.mapSize.set(coarse ? 512 : 1024, coarse ? 512 : 1024);
  Object.assign(sun.shadow.camera, { left: -5, right: 5, top: 6, bottom: -4, near: 0.5, far: 20 });
  sun.shadow.bias = -0.001;
  scene.add(ambient, sun, new THREE.DirectionalLight(0xb2e3e0, 1.2));
  const state = { yaw: -0.28, tilt: 0, layers: 0, night: 0, entry: 0, door: initialFocus === 0 ? 0.7 : 0, focus: initialFocus };
  palette.cream.color.set(initialFocus === 1 ? "#afc9be" : "#e7e5d7");
  let disposed = false, visible = false, frame = 0, firstReveal = false, drag = null, lastFrame = 0;
  let targetYaw = state.yaw, targetTilt = 0, focusTween, layerTween, introTween, lightTween, doorTween;
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const occluders = [parts.base, parts.walls, parts.joinery, parts.roof, parts.garden];
  function render(time = 0) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const ease = Math.min(0.22, (time - lastFrame || 16.7) / 130); lastFrame = time;
    state.yaw += (targetYaw - state.yaw) * ease;
    state.tilt += (targetTilt - state.tilt) * ease;
    world.rotation.set(state.tilt, state.yaw, 0);
    world.position.y = -0.2 + state.entry * 0.2;
    parts.roof.position.y = state.layers * 1.6;
    parts.walls.position.y = state.layers * 0.55;
    parts.joinery.position.y = state.layers * 0.24;
    camera.zoom = 1 - state.layers * 0.18;
    camera.lookAt(0, 1.1 + state.layers * 0.42, 0);
    camera.updateProjectionMatrix();
    parts.pins.visible = state.layers < 0.1 && state.entry > 0.98;
    hotspots.forEach((p, i) => {
      p.quaternion.copy(camera.quaternion).premultiply(world.quaternion.clone().invert());
      p.scale.setScalar(state.focus === Math.floor(i / 2) ? 1.45 : 1);
    });
    door.rotation.y = -state.door;
    ambient.intensity = 2.5 - state.night * 1.45;
    sun.intensity = 3.8 - state.night * 2.7;
    palette.glass.emissiveIntensity = 0.06 + state.night * 1.35;
    renderer.toneMappingExposure = 1.3 - state.night * 0.15;
    renderer.render(scene, camera);
    canvas.dataset.yaw = state.yaw.toFixed(2);
    canvas.dataset.layers = state.layers.toFixed(2);
    if (Math.abs(targetYaw - state.yaw) + Math.abs(targetTilt - state.tilt) > 0.0005) request();
  }
  function request() { if (!disposed && !frame && visible && !document.hidden) frame = requestAnimationFrame(render); }
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    const aspect = w / h, frustum = Math.max(6.6, 7.7 / aspect);
    camera.left = -frustum * aspect / 2; camera.right = frustum * aspect / 2;
    camera.top = frustum / 2; camera.bottom = -frustum / 2;
    camera.updateProjectionMatrix(); request();
  };
  const interrupt = () => {
    if (introTween?.isActive()) { introTween.kill(); state.layers = 0; }
    state.entry = 1; focusTween?.kill(); onInteract?.();
  };
  const down = (e) => {
    if (e.button !== 0 || (drag && drag.id !== e.pointerId)) return;
    interrupt(); drag = { id: e.pointerId, x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY, moved: false };
    canvas.setPointerCapture(e.pointerId); host.classList.add("is-dragging");
  };
  const move = (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > 7) drag.moved = true;
    targetYaw += dx * 0.009;
    if (e.pointerType !== "touch") targetTilt = THREE.MathUtils.clamp(targetTilt + dy * 0.003, -0.17, 0.14);
    drag.x = e.clientX; drag.y = e.clientY; request();
  };
  const up = (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    if (!drag.moved && e.type !== "pointercancel") {
      const b = canvas.getBoundingClientRect();
      // Use a finger-sized screen-space target, while rejecting pins behind the house.
      let closest = 24, selected = -1;
      if (parts.pins.visible) {
        world.updateMatrixWorld(true); camera.updateMatrixWorld(true);
        for (let i = 0; i < hotspots.length; i += 2) {
          const point = hotspots[i].getWorldPosition(new THREE.Vector3());
          const screen = point.clone().project(camera);
          if (screen.z < -1 || screen.z > 1) continue;
          const distance = Math.hypot(b.left + (screen.x + 1) * b.width / 2 - e.clientX, b.top + (1 - screen.y) * b.height / 2 - e.clientY);
          if (distance >= closest) continue;
          pointer.set(screen.x, screen.y); raycaster.setFromCamera(pointer, camera);
          const blocker = raycaster.intersectObjects(occluders, true)[0];
          if (blocker && blocker.distance < raycaster.ray.origin.distanceTo(point) - 0.14) continue;
          closest = distance; selected = i / 2;
        }
      }
      if (selected >= 0) onFocus?.(selected);
    }
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    drag = null; targetTilt = 0; host.classList.remove("is-dragging"); request();
  };
  const lost = () => { drag = null; targetTilt = 0; host.classList.remove("is-dragging"); request(); };
  const visibility = () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else request();
  };
  const contextLost = (e) => { e.preventDefault(); onError?.(); };
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointercancel", up);
  canvas.addEventListener("lostpointercapture", lost);
  canvas.addEventListener("webglcontextlost", contextLost);
  document.addEventListener("visibilitychange", visibility);
  const ro = new ResizeObserver(resize); ro.observe(host);
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      if (!firstReveal) {
        firstReveal = true; state.layers = 1;
        introTween = gsap.to(state, { entry: 1, layers: 0, duration: 1.8, ease: "power3.inOut", onUpdate: request });
      }
      request();
    } else { cancelAnimationFrame(frame); frame = 0; }
  }, { threshold: 0.05 });
  io.observe(host); resize();
  return {
    focus(index) {
      interrupt(); state.entry = 1; state.focus = index;
      layerTween?.kill(); layerTween = gsap.to(state, { layers: 0, duration: 0.8, ease: "power3.out", onUpdate: request });
      const angles = [-0.62, 0.5, -0.3, -1.15];
      const next = angles[index] ?? -0.28;
      const delta = Math.atan2(Math.sin(next - targetYaw), Math.cos(next - targetYaw));
      const target = { y: targetYaw };
      focusTween = gsap.to(target, { y: targetYaw + delta, duration: 1.1, ease: "power3.inOut", onUpdate: () => { targetYaw = target.y; request(); } });
      doorTween?.kill(); doorTween = gsap.to(state, { door: index === 0 ? 0.7 : 0, duration: 0.8, onUpdate: request });
      palette.cream.color.set(index === 1 ? "#afc9be" : "#e7e5d7");
      request();
    },
    layers(open) {
      interrupt(); state.entry = 1;
      layerTween?.kill(); layerTween = gsap.to(state, { layers: open ? 1 : 0, duration: 1.25, ease: "power3.inOut", onUpdate: request });
    },
    night(value) {
      lightTween?.kill(); lightTween = gsap.to(state, { night: value ? 1 : 0, duration: 1.3, ease: "power2.inOut", onUpdate: request });
    },
    rotate(delta) { interrupt(); state.entry = 1; targetYaw += delta; request(); },
    reset() {
      interrupt(); targetYaw = -0.28; targetTilt = 0;
      layerTween?.kill(); layerTween = gsap.to(state, { layers: 0, duration: 0.8, ease: "power3.out", onUpdate: request });
      request();
    },
    dispose() {
      disposed = true; cancelAnimationFrame(frame);
      [introTween, focusTween, layerTween, lightTween, doorTween].forEach((t) => t?.kill());
      ro.disconnect(); io.disconnect();
      canvas.removeEventListener("pointerdown", down); canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up); canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("lostpointercapture", lost); canvas.removeEventListener("webglcontextlost", contextLost);
      document.removeEventListener("visibilitychange", visibility);
      geometries.forEach((g) => g.dispose()); materials.forEach((m) => m.dispose()); shadowTexture.dispose();
      sun.shadow.map?.dispose(); renderer.dispose(); canvas.remove(); host.classList.remove("is-dragging");
    },
  };
}
