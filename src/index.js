import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, extend, useThree, useFrame, useLoader } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './styles.css'

extend({ OrbitControls })

const tracks = [
  '/Audio/12xmonobrowser-001.ogg',
  '/Audio/12xmonobrowser-002.ogg',
  '/Audio/12xmonobrowser-003.ogg',
  '/Audio/12xmonobrowser-004.ogg',
  '/Audio/12xmonobrowser-005.ogg',
  '/Audio/12xmonobrowser-006.ogg',
  '/Audio/12xmonobrowser-007.ogg',
  '/Audio/12xmonobrowser-008.ogg',
  '/Audio/12xmonobrowser-009.ogg',
  '/Audio/12xmonobrowser-010.ogg',
  '/Audio/12xmonobrowser-011.ogg',
  '/Audio/12xmonobrowser-012.ogg'
]

const Controls = props => {
  const { camera, gl } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} target={[0, 0, 0]} enableDamping maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} args={[camera, gl.domElement]} />
}

function Sound({ url }) {
  const sound = useRef()
  const { camera } = useThree()
  const [listener] = useState(() => new THREE.AudioListener())
  const buffer = useLoader(THREE.AudioLoader, url)
  useEffect(() => {
    sound.current.setBuffer(buffer)
    sound.current.setRefDistance(1)
    sound.current.setLoop(true)
    sound.current.play()
    sound.current.setDirectionalCone(90, 210, 0.3)
    camera.add(listener)
    return () => camera.remove(listener)
  }, [])
  return <positionalAudio ref={sound} args={[listener]} />
}

function App() {
  const [play, setPlay] = useState(false)

  const onClick = () => {
    setPlay(true)
  }
  return (
    <>
      <button className="playButton" onClick={onClick}>
        //PLAY//
      </button>
      {play && (
        <Canvas camera={{ position: [0, 0, 0.5] }}>
          <Suspense fallback={null}>
            <ambientLight></ambientLight>
            <spotLight castShadow position={[100, 100, 20]}></spotLight>

            {tracks.map(url => (
              <mesh position={[Math.random() * 10 - 5, 0, Math.random() * 10 - 5]}>
                <boxBufferGeometry attach="geometry" />
                <meshPhysicalMaterial attach="material" color="rgb(207, 192, 9)" />
                <Sound url={url} />
              </mesh>
            ))}
          </Suspense>

          <Controls enableKeys={true} autoRotate />
        </Canvas>
      )}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
