import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Dom, Canvas, extend, useThree, useFrame, useLoader } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import ClipLoader from 'react-spinners/ScaleLoader'
import { FaPlay } from 'react-icons/fa'
import './styles.css'
import { TextGeometry } from 'three'

extend({ OrbitControls })

const tracks = [
  { id: 1, url: '/Audio/12xmonobrowser-001.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 2, url: '/Audio/12xmonobrowser-002.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 3, url: '/Audio/12xmonobrowser-003.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 4, url: '/Audio/12xmonobrowser-004.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 5, url: '/Audio/12xmonobrowser-005.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 6, url: '/Audio/12xmonobrowser-006.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 7, url: '/Audio/12xmonobrowser-007.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 8, url: '/Audio/12xmonobrowser-008.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 9, url: '/Audio/12xmonobrowser-009.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 10, url: '/Audio/12xmonobrowser-010.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 11, url: '/Audio/12xmonobrowser-011.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 12, url: '/Audio/12xmonobrowser-012.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 }
]

const Controls = props => {
  const { camera, gl } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())

  return (
    <orbitControls
      ref={ref}
      target={[0, 0, 0]}
      enableDamping
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      {...props}
    />
  )
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
    sound.current.setDirectionalCone(120, 260, 0.3)
    camera.add(listener)
    return () => camera.remove(listener)
  }, [])
  return <positionalAudio ref={sound} args={[listener]} />
}

const Loading = () => (
  <Dom>
    <div className="loading">
      <p>LOADING...</p>
      <ClipLoader className="spinner" size={300} color={'white'} />
    </div>
  </Dom>
)

function App() {
  const [play, setPlay] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const onClick = () => {
    setPlay(true)
  }
  const closeControls = () => {
    setShowControls(false)
  }
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5] }}>
        {!play && (
          <>
            <Dom position={[100, -50, 100]}>
              <button className="playButton" onClick={onClick}>
                <code>|> 12xMono - David Currie |></code>
              </button>
            </Dom>
          </>
        )}
        {play && (
          <Suspense fallback={<Loading />}>
            {/* {
              <Dom position={[0, 0, 0]}>
                <p>play</p>
              </Dom>
            } */}
            {showControls && (
              <Dom className="controls" position={[100, 0, 100]}>
                <p>
                  Left-Mouse = rotate, Right-Mouse = Pan, Scroll = Zoom{' '}
                  <button className="closeControls" onClick={closeControls}>
                    X
                  </button>
                </p>
              </Dom>
            )}
            <ambientLight />
            <spotLight castShadow intensity={1} angle={Math.PI / 10} position={[10, 10, 10]} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
            <spotLight intensity={0.5} castShadow position={[10, 100, 20]}></spotLight>
            <ambientLight />
            <pointLight intensity={4} />
            {tracks.map(node => (
              <mesh rotation={[0, node.rotation, 0]} key={node.id} position={[node.x, 0, node.z]}>
                <boxBufferGeometry attach="geometry" />
                <meshPhysicalMaterial attach="material" color="#222222" />
                <Sound url={node.url} />
              </mesh>
            ))}
          </Suspense>
        )}

        <Controls autoRotateSpeed={0.5} autoRotate={play ? false : true} zoomSpeed={0.25} />
      </Canvas>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
