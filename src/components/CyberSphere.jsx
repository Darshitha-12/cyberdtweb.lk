import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function CyberSphere() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50)
    camera.position.set(0, 0, 6.2)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const CYAN = 0x00f2fe
    const GREEN = 0x00e676

    // ---- outer cryptographic wireframe shell ----
    const shellGeo = new THREE.IcosahedronGeometry(2.15, 2)
    const shellEdges = new THREE.EdgesGeometry(shellGeo)
    const shellMat = new THREE.LineBasicMaterial({
      color: CYAN,
      transparent: true,
      opacity: 0.35,
    })
    const shell = new THREE.LineSegments(shellEdges, shellMat)
    group.add(shell)

    // ---- vertex nodes ----
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(
      new THREE.IcosahedronGeometry(2.15, 2).getAttribute('position').clone(),
    )
    const nodeMat = new THREE.PointsMaterial({
      color: GREEN,
      size: 0.055,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const nodes = new THREE.Points(nodeGeo, nodeMat)
    group.add(nodes)

    // ---- glowing data core ----
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 1)
    const coreMat = new THREE.MeshBasicMaterial({
      color: CYAN,
      transparent: true,
      opacity: 0.12,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    group.add(core)

    const coreWireGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.95, 1))
    const coreWireMat = new THREE.LineBasicMaterial({
      color: GREEN,
      transparent: true,
      opacity: 0.55,
    })
    const coreWire = new THREE.LineSegments(coreWireGeo, coreWireMat)
    group.add(coreWire)

    // ---- orbital rings ----
    const makeRing = (radius, tiltX, tiltZ, color, opacity) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.012, 8, 120),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity }),
      )
      ring.rotation.x = tiltX
      ring.rotation.z = tiltZ
      return ring
    }
    const ringA = makeRing(2.85, Math.PI / 2.25, 0.4, CYAN, 0.5)
    const ringB = makeRing(3.25, Math.PI / 1.75, -0.7, GREEN, 0.28)
    group.add(ringA, ringB)

    // ---- cursor-reactive rotation targets ----
    const targetRot = { x: 0, y: 0 }
    const currentRot = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect()
      targetRot.y = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 0.9
      targetRot.x = (-((e.clientY - rect.top) / rect.height) * 2 + 1) * 0.55
    }
    window.addEventListener('mousemove', onMouseMove)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(mount)

    let rafId = 0
    let running = true
    const clock = new THREE.Clock()

    const tick = () => {
      if (!running) return
      rafId = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()

      currentRot.y += (targetRot.y - currentRot.y) * 0.045
      currentRot.x += (targetRot.x - currentRot.x) * 0.045

      group.rotation.y = t * 0.18 + currentRot.y
      group.rotation.x = Math.sin(t * 0.22) * 0.16 + currentRot.x

      core.rotation.y = -t * 0.55
      core.rotation.z = t * 0.3
      coreWire.rotation.y = -t * 0.55
      coreWire.rotation.z = t * 0.3
      core.scale.setScalar(1 + Math.sin(t * 2.1) * 0.08)

      ringA.rotation.z = t * 0.35
      ringB.rotation.z = -t * 0.25

      nodeMat.size = 0.05 + Math.sin(t * 3) * 0.012

      renderer.render(scene, camera)
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(rafId)
      } else if (!running) {
        running = true
        clock.start()
        tick()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    tick()

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('visibilitychange', onVisibility)
      observer.disconnect()
      ;[shellGeo, shellEdges, nodeGeo, coreGeo, coreWireGeo].forEach((g) => g.dispose())
      ;[shellMat, nodeMat, coreMat, coreWireMat].forEach((m) => m.dispose())
      ringA.geometry.dispose()
      ringB.geometry.dispose()
      ringA.material.dispose()
      ringB.material.dispose()
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
    />
  )
}
