import { Canvas } from '@react-three/fiber'
import Room from './components/Room'
import CameraControls from './components/CameraControls'

function App() {
  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }}
      camera={{
        position: [0, 2.5, 10],
        fov: 45,
        near: 0.1,
        far: 100
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} />

      <Room />
      <CameraControls />
    </Canvas>
  )
}

export default App
