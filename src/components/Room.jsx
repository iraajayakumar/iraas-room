import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Room() {
  const group = useRef()
  const { scene, animations } = useGLTF('/src/assets/models/room_shell.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Play ALL animations (curtain wave loop)
    Object.values(actions).forEach((action) => {
      action.reset().play()
    })
  }, [actions])

  return <primitive ref={group} object={scene} rotation={[0, Math.PI/2, 0]} />
}
