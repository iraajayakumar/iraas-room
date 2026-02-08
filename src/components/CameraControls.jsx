import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function CameraControls() {
  const controlsRef = useRef()

  useFrame(() => {
    if (!controlsRef.current) return

    const target = controlsRef.current.target

    // Clamp panning inside room
    target.x = Math.max(-1, Math.min(1, target.x))
    target.y = Math.max(1.5, Math.min(3, target.y))
    target.z = Math.max(-2.4, Math.min(-0.6, target.z))
  })

  return (
    <OrbitControls
      ref={controlsRef}
      target={[0, 2, 0]}
      //enablePan
      screenSpacePanning
      enableDamping
      dampingFactor={0.08}
      minAzimuthAngle={-Math.PI / 6}
      maxAzimuthAngle={Math.PI / 6}
      minDistance={5}
      maxDistance={10}
      minPolarAngle={Math.PI / 2.2}
      maxPolarAngle={Math.PI / 2.2}
    />
  )
}
