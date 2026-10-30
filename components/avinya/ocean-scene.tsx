'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Stars, Trail } from '@react-three/drei'
import * as THREE from 'three'
import { ISLANDS } from '@/lib/avinya-data'

export const ISLAND_POSITIONS: [number, number][] = [
  [-38, -70],
  [26, -150],
  [-18, -235],
]
const ISLAND_COLORS = ['#f0a04b', '#ff3d9a', '#5fe3e8']
const STOP_DISTANCE = 22
const SUN_DIR = new THREE.Vector3(-0.35, 0.12, -1).normalize()

const WAVES = [
  { dir: [1, 0.3], amp: 0.55, freq: 0.08, speed: 0.9 },
  { dir: [-0.4, 1], amp: 0.35, freq: 0.14, speed: 1.2 },
  { dir: [0.7, -0.7], amp: 0.18, freq: 0.32, speed: 1.8 },
  { dir: [-1, -0.2], amp: 0.08, freq: 0.7, speed: 2.6 },
]

function waveHeight(x: number, z: number, t: number) {
  let h = 0
  for (const w of WAVES) {
    const len = Math.hypot(w.dir[0], w.dir[1])
    h += w.amp * Math.sin((x * w.dir[0] + z * w.dir[1]) / len * w.freq + t * w.speed)
  }
  return h
}

const waveGlsl = WAVES.map((w) => {
  const len = Math.hypot(w.dir[0], w.dir[1])
  return `h += ${w.amp.toFixed(3)} * sin((p.x * ${(w.dir[0] / len).toFixed(4)} + p.y * ${(w.dir[1] / len).toFixed(4)}) * ${w.freq.toFixed(3)} + t * ${w.speed.toFixed(2)});`
}).join('\n')

const waterVertex = /* glsl */ `
  uniform float uTime;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vHeight;
  float wave(vec2 p, float t) {
    float h = 0.0;
    ${waveGlsl}
    return h;
  }
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec2 p = world.xz;
    float h = wave(p, uTime);
    float e = 0.4;
    float hx = wave(p + vec2(e, 0.0), uTime);
    float hz = wave(p + vec2(0.0, e), uTime);
    vNormal = normalize(vec3(h - hx, e, h - hz));
    world.y += h;
    vHeight = h;
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const waterFragment = /* glsl */ `
  uniform vec3 uSunDir;
  uniform vec3 uDeep;
  uniform vec3 uShallow;
  uniform vec3 uHorizon;
  uniform vec3 uSun;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vHeight;
  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorld);
    vec3 n = normalize(vNormal);
    float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 4.0);
    vec3 col = mix(uDeep, uShallow, smoothstep(-0.6, 0.9, vHeight));
    col = mix(col, uHorizon, fresnel * 0.85);
    vec3 refl = reflect(-viewDir, n);
    float spec = pow(max(dot(refl, uSunDir), 0.0), 120.0);
    float glitter = pow(max(dot(refl, uSunDir), 0.0), 14.0) * 0.35;
    col += uSun * (spec * 2.2 + glitter);
    float dist = length(cameraPosition.xz - vWorld.xz);
    float fog = smoothstep(60.0, 340.0, dist);
    col = mix(col, uHorizon, fog);
    gl_FragColor = vec4(col, 1.0);
  }
`

const skyVertex = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const skyFragment = /* glsl */ `
  uniform vec3 uSunDir;
  uniform vec3 uHorizon;
  uniform vec3 uZenith;
  uniform vec3 uSun;
  varying vec3 vDir;
  void main() {
    vec3 d = normalize(vDir);
    float y = clamp(d.y, 0.0, 1.0);
    vec3 col = mix(uHorizon, uZenith, pow(y, 0.45));
    float s = max(dot(d, uSunDir), 0.0);
    col += uSun * pow(s, 900.0) * 3.0;
    col += uSun * pow(s, 12.0) * 0.35;
    col += uHorizon * pow(1.0 - y, 8.0) * 0.4;
    gl_FragColor = vec4(col, 1.0);
  }
`

function Sky() {
  const uniforms = useMemo(
    () => ({
      uSunDir: { value: SUN_DIR },
      uHorizon: { value: new THREE.Color('#b8693a') },
      uZenith: { value: new THREE.Color('#060912') },
      uSun: { value: new THREE.Color('#ffc48a') },
    }),
    [],
  )
  return (
    <mesh>
      <sphereGeometry args={[480, 32, 16]} />
      <shaderMaterial
        side={THREE.BackSide}
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={skyVertex}
        fragmentShader={skyFragment}
      />
    </mesh>
  )
}

function Water({ segments }: { segments: number }) {
  const ref = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSunDir: { value: SUN_DIR },
      uDeep: { value: new THREE.Color('#05121c') },
      uShallow: { value: new THREE.Color('#123444') },
      uHorizon: { value: new THREE.Color('#a85f36') },
      uSun: { value: new THREE.Color('#ffb070') },
    }),
    [],
  )
  useFrame((state) => {
    if (ref.current) ref.current.uniforms.uTime.value = state.clock.elapsedTime
  })
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, -120]}>
      <planeGeometry args={[700, 700, segments, segments]} />
      <shaderMaterial ref={ref} uniforms={uniforms} vertexShader={waterVertex} fragmentShader={waterFragment} />
    </mesh>
  )
}

function Planet() {
  return (
    <group position={[150, 120, -440]}>
      <mesh>
        <sphereGeometry args={[95, 48, 48]} />
        <meshBasicMaterial color="#d9c3a0" transparent opacity={0.5} fog={false} />
      </mesh>
      <mesh rotation={[1.25, 0.2, 0.3]}>
        <ringGeometry args={[120, 165, 96]} />
        <meshBasicMaterial color="#e7d3b0" transparent opacity={0.18} side={THREE.DoubleSide} fog={false} />
      </mesh>
    </group>
  )
}

function IslandBeacon({
  index,
  active,
  onSelect,
}: {
  index: number
  active: boolean
  onSelect: (i: number) => void
}) {
  const [x, z] = ISLAND_POSITIONS[index]
  const color = ISLAND_COLORS[index]
  const island = ISLANDS[index]
  const beam = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!beam.current) return
    const m = beam.current.material as THREE.MeshBasicMaterial
    const pulse = 0.22 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.08
    m.opacity = active ? pulse + 0.2 : pulse
  })

  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, -2, 0]} scale={[14, 5, 10]}>
        <sphereGeometry args={[1, 24, 12]} />
        <meshBasicMaterial color="#0b0d10" />
      </mesh>
      <mesh position={[3, 1, -2]} scale={[5, 9, 4]}>
        <sphereGeometry args={[1, 16, 10]} />
        <meshBasicMaterial color="#0e1014" />
      </mesh>
      <mesh ref={beam} position={[0, 40, 0]}>
        <cylinderGeometry args={[0.35, 1.6, 80, 16, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 10, 0]}>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <pointLight position={[0, 10, 0]} color={color} intensity={active ? 600 : 250} distance={60} />
      <Html position={[0, 9, 0]} center zIndexRange={[20, 0]}>
        <button
          type="button"
          onClick={() => onSelect(index + 1)}
          className="whitespace-nowrap rounded-sm border bg-black/60 px-3 py-1.5 text-left backdrop-blur transition-transform hover:scale-105"
          style={{ borderColor: color }}
        >
          <span className="block text-[0.6rem] uppercase tracking-[0.25em]" style={{ color }}>
            {`Day 0${island.day}`}
          </span>
          <span className="block font-display text-[0.7rem] text-white">{island.name}</span>
        </button>
      </Html>
    </group>
  )
}

function makeHullGeometry() {
  const shape = new THREE.Shape()
  shape.moveTo(0, -2.6)
  shape.quadraticCurveTo(1.1, -1.2, 1, 1.6)
  shape.lineTo(0.8, 2.1)
  shape.lineTo(-0.8, 2.1)
  shape.lineTo(-1, 1.6)
  shape.quadraticCurveTo(-1.1, -1.2, 0, -2.6)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.7,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.12,
    bevelSegments: 2,
  })
  geo.rotateX(Math.PI / 2)
  geo.translate(0, 0.55, 0)
  return geo
}

function Boat({
  target,
  onArrive,
}: {
  target: number
  onArrive: (i: number) => void
}) {
  const group = useRef<THREE.Group>(null)
  const stern = useRef<THREE.Mesh>(null)
  const heading = useRef(0)
  const arrivedAt = useRef(-1)
  const hull = useMemo(makeHullGeometry, [])
  const goal = useMemo(() => new THREE.Vector3(), [])
  const camPos = useMemo(() => new THREE.Vector3(0, 6, 14), [])
  const lookAt = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const dt = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime

    if (target === 0) {
      goal.set(0, 0, 0)
    } else {
      const [ix, iz] = ISLAND_POSITIONS[target - 1]
      const dir = new THREE.Vector3(ix - g.position.x, 0, iz - g.position.z)
      const len = dir.length()
      dir.normalize()
      goal.set(ix - dir.x * STOP_DISTANCE, 0, iz - dir.z * STOP_DISTANCE)
      if (len < STOP_DISTANCE + 0.1) goal.copy(g.position)
    }

    const toGoal = new THREE.Vector3(goal.x - g.position.x, 0, goal.z - g.position.z)
    const dist = toGoal.length()
    const speed = Math.min(dist * 0.9, 16)
    if (dist > 0.15) {
      const desired = Math.atan2(-toGoal.x, -toGoal.z)
      let diff = desired - heading.current
      diff = Math.atan2(Math.sin(diff), Math.cos(diff))
      heading.current += diff * Math.min(1, dt * 2.2)
      g.position.x += -Math.sin(heading.current) * speed * dt
      g.position.z += -Math.cos(heading.current) * speed * dt
    }
    if (dist < 1.2 && arrivedAt.current !== target) {
      arrivedAt.current = target
      onArrive(target)
    }

    const h = waveHeight(g.position.x, g.position.z, t)
    const hf = waveHeight(g.position.x - Math.sin(heading.current) * 2, g.position.z - Math.cos(heading.current) * 2, t)
    const hs = waveHeight(g.position.x + Math.cos(heading.current), g.position.z - Math.sin(heading.current), t)
    g.position.y = h - 0.1
    g.rotation.set(0, 0, 0)
    g.rotateY(heading.current)
    g.rotateX((hf - h) * 0.35)
    g.rotateZ((hs - h) * 0.35)

    const back = new THREE.Vector3(Math.sin(heading.current), 0, Math.cos(heading.current))
    const px = state.pointer.x * 3
    camPos.lerp(
      new THREE.Vector3(g.position.x + back.x * 15 + px, 6.5 + state.pointer.y * 1.5, g.position.z + back.z * 15),
      Math.min(1, dt * 1.6),
    )
    state.camera.position.copy(camPos)
    lookAt.lerp(new THREE.Vector3(g.position.x - back.x * 20, 3, g.position.z - back.z * 20), Math.min(1, dt * 2))
    state.camera.lookAt(lookAt)
  })

  return (
    <>
      <group ref={group}>
        <mesh geometry={hull}>
          <meshStandardMaterial color="#d7cfc2" roughness={0.55} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1.05, 0.5]}>
          <boxGeometry args={[1.2, 0.8, 1.6]} />
          <meshStandardMaterial color="#1b1f26" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 1.15, -0.35]}>
          <boxGeometry args={[1.1, 0.5, 0.05]} />
          <meshBasicMaterial color="#f0a04b" />
        </mesh>
        <mesh position={[0, 2.2, 0.8]}>
          <cylinderGeometry args={[0.04, 0.04, 1.8, 6]} />
          <meshStandardMaterial color="#9aa0a8" />
        </mesh>
        <mesh position={[0, 3.15, 0.8]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshBasicMaterial color="#ff5a3c" />
        </mesh>
        <pointLight position={[0, 1.6, -2.5]} color="#ffb070" intensity={30} distance={14} />
        <Trail width={2.4} length={10} color="#cfe6ea" attenuation={(w) => w * w} decay={1}>
          <mesh ref={stern} position={[0, 0.1, 2.2]}>
            <sphereGeometry args={[0.01]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </Trail>
      </group>
    </>
  )
}

export default function OceanScene({
  target,
  onSelect,
  onArrive,
  compact,
}: {
  target: number
  onSelect: (i: number) => void
  onArrive: (i: number) => void
  compact: boolean
}) {
  return (
    <Canvas
      dpr={compact ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 6, 14], fov: compact ? 62 : 50, near: 0.1, far: 1200 }}
      gl={{ antialias: !compact, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.35} color="#c9a888" />
      <directionalLight position={[-30, 20, -80]} intensity={1.4} color="#ffb47a" />
      <Sky />
      <Stars radius={300} depth={60} count={compact ? 1500 : 3500} factor={5} saturation={0} fade speed={0.4} />
      <Planet />
      <Water segments={compact ? 110 : 200} />
      {ISLANDS.map((_, i) => (
        <IslandBeacon key={i} index={i} active={target === i + 1} onSelect={onSelect} />
      ))}
      <Boat target={target} onArrive={onArrive} />
    </Canvas>
  )
}
