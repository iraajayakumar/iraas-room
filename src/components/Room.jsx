import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Room() {
  const group = useRef()
  const { scene, animations } = useGLTF('/src/assets/models/room_shell.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Play animations
    Object.values(actions).forEach((action) => {
      action.reset().play()
    })

    // Single traverse: shadows + glass fix + envMapIntensity
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        // Shadows for all meshes
        obj.castShadow = true
        obj.receiveShadow = true

        // Glass fix (Blender Kit panes)
        const isGlass = obj.name.toLowerCase().includes('glass') || 
                        obj.material.name?.toLowerCase().includes('glass') ||
                        obj.material.name?.includes('pane') // Common alt names
        if (isGlass) {
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          mats.forEach((mat) => {
            mat.transparent = true
            mat.transmission = 0.95
            mat.ior = 1.45
            mat.thickness = 0.5
            mat.roughness = 0.01  // Slight for realism
            mat.needsUpdate = true
          })
        }

        // Tone down HDR for all materials
        const mats2 = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats2.forEach((mat) => {
          if (mat.envMapIntensity !== undefined) {
            mat.envMapIntensity = 0.6
            mat.needsUpdate = true
          }
        })
      }
    })
  }, [actions]) // Remove scene from deps

  return (
    <primitive
      ref={group}
      object={scene}
      rotation={[0, Math.PI / 2, 0]}
    />
  )
}
