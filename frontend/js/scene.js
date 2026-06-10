/**
 * scene.js — Three.js WebGL Space Scene for Alpha Agency
 *
 * Features (skill-grade, realistic):
 *  • Planet with custom Fresnel atmosphere ShaderMaterial
 *  • MeshStandardMaterial planet surface with proper PBR lighting
 *  • 4 500 stars with per-star color via BufferGeometry
 *  • Nebula cloud — AdditiveBlending, size-varied particles
 *  • 3 stacked planet rings (TorusGeometry)
 *  • 180-point asteroid belt (PointsMaterial)
 *  • 3 orbiting moons
 *  • Shooting-star system (Line + opacity fade)
 *  • Mouse parallax camera (smooth lerp)
 *  • Scroll Y camera drift
 */

export function initScene() {
  const canvas = document.getElementById('space-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  /* ── Renderer ── */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  /* ── Scene / Camera ── */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 300);
  camera.position.z = 7;

  /* ── Fog ── */
  scene.fog = new THREE.FogExp2(0x030307, 0.018);

  /* ══════════════════════════════════════
     LIGHTS
  ══════════════════════════════════════ */
  scene.add(new THREE.AmbientLight(0x0d0820, 3));

  const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
  sunLight.position.set(6, 3, 4);
  scene.add(sunLight);

  const rimLight = new THREE.PointLight(0x00d4ff, 3, 25);
  rimLight.position.set(-5, 2, 1);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(0x7c3aed, 2, 20);
  fillLight.position.set(2, -3, 2);
  scene.add(fillLight);

  /* ══════════════════════════════════════
     STARFIELD  (4 500 stars, spherical distribution)
  ══════════════════════════════════════ */
  const STAR_COUNT = 4500;
  const starPositions = new Float32Array(STAR_COUNT * 3);
  const starColors    = new Float32Array(STAR_COUNT * 3);
  const starSizes     = new Float32Array(STAR_COUNT);

  const STAR_PALETTE = [
    new THREE.Color('#ffffff'),
    new THREE.Color('#dde8ff'),
    new THREE.Color('#c4b5fd'),
    new THREE.Color('#a5f3fc'),
    new THREE.Color('#fde68a'),
    new THREE.Color('#fca5a5'),
  ];

  for (let i = 0; i < STAR_COUNT; i++) {
    const i3  = i * 3;
    const r   = 12 + Math.random() * 80;
    const th  = Math.random() * Math.PI * 2;
    const ph  = Math.acos(2 * Math.random() - 1);
    starPositions[i3]     = r * Math.sin(ph) * Math.cos(th);
    starPositions[i3 + 1] = r * Math.sin(ph) * Math.sin(th);
    starPositions[i3 + 2] = r * Math.cos(ph);
    const c = STAR_PALETTE[Math.floor(Math.random() * STAR_PALETTE.length)];
    starColors[i3] = c.r; starColors[i3 + 1] = c.g; starColors[i3 + 2] = c.b;
    starSizes[i] = 0.4 + Math.random() * 1.6;
  }

  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('color',    new THREE.BufferAttribute(starColors, 3));
  starGeo.setAttribute('size',     new THREE.BufferAttribute(starSizes, 1));

  const starMat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  scene.add(new THREE.Points(starGeo, starMat));

  /* ══════════════════════════════════════
     NEBULA  (800 coloured puffs, additive)
  ══════════════════════════════════════ */
  const NEB_COUNT = 800;
  const nebPos  = new Float32Array(NEB_COUNT * 3);
  const nebCol  = new Float32Array(NEB_COUNT * 3);
  const nebSize = new Float32Array(NEB_COUNT);

  const NEB_PALETTE = [
    new THREE.Color('#4c1d95'),
    new THREE.Color('#7c3aed'),
    new THREE.Color('#0e7490'),
    new THREE.Color('#00d4ff'),
    new THREE.Color('#f59e0b'),
    new THREE.Color('#1e1b4b'),
  ];

  for (let i = 0; i < NEB_COUNT; i++) {
    const i3 = i * 3;
    nebPos[i3]     = (Math.random() - 0.5) * 22;
    nebPos[i3 + 1] = (Math.random() - 0.5) * 12;
    nebPos[i3 + 2] = (Math.random() - 0.5) * 10 - 3;
    const c = NEB_PALETTE[Math.floor(Math.random() * NEB_PALETTE.length)];
    nebCol[i3] = c.r; nebCol[i3 + 1] = c.g; nebCol[i3 + 2] = c.b;
    nebSize[i] = 1 + Math.random() * 4;
  }

  const nebGeo = new THREE.BufferGeometry();
  nebGeo.setAttribute('position', new THREE.BufferAttribute(nebPos, 3));
  nebGeo.setAttribute('color',    new THREE.BufferAttribute(nebCol, 3));

  const nebMat = new THREE.PointsMaterial({
    size: 0.18,
    vertexColors: true,
    transparent: true,
    opacity: 0.22,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const nebula = new THREE.Points(nebGeo, nebMat);
  scene.add(nebula);

  /* ══════════════════════════════════════
     PLANET — Fresnel atmosphere shader
  ══════════════════════════════════════ */
  const planetGroup = new THREE.Group();
  planetGroup.position.set(3.2, 0.2, -1.5);
  scene.add(planetGroup);

  /* Surface */
  const surfaceGeo = new THREE.SphereGeometry(1.55, 128, 128);
  const surfaceMat = new THREE.MeshStandardMaterial({
    color:     0x0d0524,
    emissive:  0x1a0040,
    emissiveIntensity: 0.3,
    roughness: 0.85,
    metalness: 0.15,
  });
  const planetMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
  planetGroup.add(planetMesh);

  /* Fresnel atmosphere layer */
  const atmoVert = `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vNormal  = normalize(normalMatrix * normal);
      vec4 mv  = modelViewMatrix * vec4(position, 1.0);
      vViewDir = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }
  `;
  const atmoFrag = `
    uniform vec3  uColor;
    uniform float uPow;
    uniform float uAlpha;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), uPow);
      gl_FragColor  = vec4(uColor, fresnel * uAlpha);
    }
  `;

  function makeAtmo(radius, color, pow, alpha) {
    const geo = new THREE.SphereGeometry(radius, 64, 64);
    const mat = new THREE.ShaderMaterial({
      vertexShader:   atmoVert,
      fragmentShader: atmoFrag,
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uPow:   { value: pow   },
        uAlpha: { value: alpha },
      },
      transparent: true,
      side:        THREE.FrontSide,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    });
    return new THREE.Mesh(geo, mat);
  }

  planetGroup.add(makeAtmo(1.70, '#7c3aed', 3.5, 0.7));  // purple inner
  planetGroup.add(makeAtmo(1.88, '#00d4ff', 4.5, 0.35)); // cyan outer
  planetGroup.add(makeAtmo(2.05, '#ffffff', 6.0, 0.08)); // white haze

  /* Wireframe overlay */
  const wireGeo = new THREE.IcosahedronGeometry(1.57, 2);
  const wireMat = new THREE.MeshBasicMaterial({
    color:       0x9d5ff5,
    wireframe:   true,
    transparent: true,
    opacity:     0.04,
  });
  planetGroup.add(new THREE.Mesh(wireGeo, wireMat));

  /* ── Rings ── */
  function addRing(r, tube, color, opacity, rx) {
    const g = new THREE.TorusGeometry(r, tube, 4, 200);
    const m = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const mesh = new THREE.Mesh(g, m);
    mesh.rotation.x = rx;
    planetGroup.add(mesh);
    return mesh;
  }
  addRing(2.20, 0.018, 0x7c3aed, 0.55, Math.PI / 2.3);
  addRing(2.60, 0.010, 0x00d4ff, 0.28, Math.PI / 2.3);
  addRing(3.00, 0.007, 0xf59e0b, 0.15, Math.PI / 2.3);

  /* ── Asteroid belt ── */
  const AST = 220;
  const astPos = new Float32Array(AST * 3);
  for (let i = 0; i < AST; i++) {
    const i3  = i * 3;
    const ang = (i / AST) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const r   = 2.2 + (Math.random() - 0.5) * 0.8;
    astPos[i3]     = Math.cos(ang) * r;
    astPos[i3 + 1] = (Math.random() - 0.5) * 0.22;
    astPos[i3 + 2] = Math.sin(ang) * r;
  }
  const astGeo = new THREE.BufferGeometry();
  astGeo.setAttribute('position', new THREE.BufferAttribute(astPos, 3));
  const astMat = new THREE.PointsMaterial({
    size: 0.05, color: 0xaaaacc,
    transparent: true, opacity: 0.45,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const astPoints = new THREE.Points(astGeo, astMat);
  astPoints.rotation.x = Math.PI / 2.3;
  planetGroup.add(astPoints);

  /* ── Moons ── */
  function makeMoon(radius, color, orbitR, speed, phase) {
    const geo  = new THREE.SphereGeometry(radius, 20, 20);
    const mat  = new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: 0.4,
      roughness: 0.9, metalness: 0.1,
    });
    return { mesh: new THREE.Mesh(geo, mat), orbitR, speed, angle: phase };
  }
  const moons = [
    makeMoon(0.14, 0x9d5ff5, 2.8, 0.7,  0),
    makeMoon(0.09, 0x00d4ff, 3.8, 0.45, Math.PI),
    makeMoon(0.07, 0xf59e0b, 4.8, 0.28, Math.PI * 0.7),
  ];
  moons.forEach(m => scene.add(m.mesh));

  /* ══════════════════════════════════════
     SHOOTING STARS
  ══════════════════════════════════════ */
  const shooters = [];

  function spawnShooter() {
    const ox = -10 + Math.random() * 20;
    const oy =   3 + Math.random() *  5;
    const oz =  -3 + Math.random() *  4;
    const pts = [
      new THREE.Vector3(ox, oy, oz),
      new THREE.Vector3(ox + 1.2, oy - 0.4, oz),
    ];
    const geo  = new THREE.BufferGeometry().setFromPoints(pts);
    const mat  = new THREE.LineBasicMaterial({
      color: 0xffffff, transparent: true, opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const line = new THREE.Line(geo, mat);
    scene.add(line);
    const vx = 2.5 + Math.random() * 3;
    const vy = -0.8 - Math.random() * 0.6;
    shooters.push({ line, vx, vy, life: 1.0 });
    setTimeout(spawnShooter, 1800 + Math.random() * 3000);
  }
  spawnShooter();

  /* ══════════════════════════════════════
     BACKGROUND WIREFRAME
  ══════════════════════════════════════ */
  const bgWire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(4.5, 1),
    new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.018 })
  );
  scene.add(bgWire);

  const outerTorus = new THREE.Mesh(
    new THREE.TorusGeometry(6.5, 0.012, 4, 140),
    new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.04,
      blending: THREE.AdditiveBlending, depthWrite: false })
  );
  outerTorus.rotation.x = Math.PI / 5;
  scene.add(outerTorus);

  /* ══════════════════════════════════════
     MOUSE + SCROLL
  ══════════════════════════════════════ */
  let mouseX = 0, mouseY = 0, scrollY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  /* ── Resize ── */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  /* ══════════════════════════════════════
     ANIMATION LOOP
  ══════════════════════════════════════ */
  const clock = new THREE.Clock();
  let camX = 0, camY = 0;

  (function animate() {
    const t = clock.getElapsedTime();

    /* Stars gentle twinkle */
    starMat.opacity = 0.80 + Math.sin(t * 0.5) * 0.08;

    /* Nebula slow drift */
    nebula.rotation.y = t * 0.006;
    nebula.rotation.x = t * 0.004;

    /* Planet self-rotate */
    planetMesh.rotation.y = t * 0.07;

    /* Planet group float + parallax */
    planetGroup.position.y  = 0.2 + Math.sin(t * 0.38) * 0.25;
    planetGroup.position.x  = 3.2 + mouseX * 0.28;
    planetGroup.rotation.y  = t * 0.04;

    /* Asteroid belt spin */
    astPoints.rotation.z = t * 0.04;

    /* Moons orbit */
    moons.forEach(m => {
      m.angle += m.speed * 0.006;
      m.mesh.position.set(
        planetGroup.position.x + Math.cos(m.angle) * m.orbitR * 0.62,
        planetGroup.position.y + Math.sin(m.angle * 0.65) * 0.35,
        planetGroup.position.z + Math.sin(m.angle) * m.orbitR * 0.62
      );
    });

    /* Shooting stars */
    for (let i = shooters.length - 1; i >= 0; i--) {
      const s   = shooters[i];
      s.life   -= 0.015;
      const pos = s.line.geometry.attributes.position;
      pos.array[0] += s.vx * 0.016;
      pos.array[1] += s.vy * 0.016;
      pos.array[3] += s.vx * 0.016;
      pos.array[4] += s.vy * 0.016;
      pos.needsUpdate = true;
      s.line.material.opacity = s.life * 0.8;
      if (s.life <= 0) { scene.remove(s.line); shooters.splice(i, 1); }
    }

    /* Background wireframe slow spin */
    bgWire.rotation.y    = t * 0.012;
    outerTorus.rotation.z = t * 0.025;

    /* Camera parallax (smooth lerp) */
    const targetX = mouseX * 0.55 - scrollY * 0.0003;
    const targetY = -mouseY * 0.38 - scrollY * 0.0004;
    camX += (targetX - camX) * 0.04;
    camY += (targetY - camY) * 0.04;
    camera.position.x = camX;
    camera.position.y = camY;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  })();
}
