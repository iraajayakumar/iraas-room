import { Canvas } from '@react-three/fiber'
import { Environment, Sky } from '@react-three/drei'
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
      <Environment preset="sunset" background />

      <Sky
        sunPosition={[10, 20, 5]} // Angle thru window (right/high)
        inclination={0.6}
        azimuth={0.8}
      />

      <directionalLight
        position={[10, 20, 5]}
        intensity={2}
        castShadow
        shadow-mapSize={2048}
        shadow-camera-left={-20} shadow-camera-right={20}
        shadow-camera-top={20} shadow-camera-bottom={-20}
      />

      <hemisphereLight intensity={0.4} skyColor="#87CEEB" groundColor="#ffaa00" />

      <Room />
      <CameraControls />
    </Canvas>
  )
}

export default App
