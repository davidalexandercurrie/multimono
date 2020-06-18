import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Dom, Canvas, extend, useThree, useFrame, useLoader } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import ClipLoader from 'react-spinners/ScaleLoader'
import { FaPlay } from 'react-icons/fa'
import './styles.css'
import { TextGeometry } from 'three'
import { useSpring } from 'react-spring'

extend({ OrbitControls })

// const tracks = [
//   { id: 1, url: '/Audio/12xmonobrowser-001.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 2, url: '/Audio/12xmonobrowser-002.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 3, url: '/Audio/12xmonobrowser-003.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 4, url: '/Audio/12xmonobrowser-004.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 5, url: '/Audio/12xmonobrowser-005.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 6, url: '/Audio/12xmonobrowser-006.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 7, url: '/Audio/12xmonobrowser-007.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 8, url: '/Audio/12xmonobrowser-008.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 9, url: '/Audio/12xmonobrowser-009.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 10, url: '/Audio/12xmonobrowser-010.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 11, url: '/Audio/12xmonobrowser-011.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 12, url: '/Audio/12xmonobrowser-012.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 }
// ]
const tracksBlake = [
  { id: 1, url: '/Audio-blake/BLAKE-001.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 2, url: '/Audio-blake/BLAKE-002.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 3, url: '/Audio-blake/BLAKE-003.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 4, url: '/Audio-blake/BLAKE-004.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 5, url: '/Audio-blake/BLAKE-005.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 6, url: '/Audio-blake/BLAKE-006.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 7, url: '/Audio-blake/BLAKE-007.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 8, url: '/Audio-blake/BLAKE-008.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 9, url: '/Audio-blake/BLAKE-009.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 10, url: '/Audio-blake/BLAKE-010.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 11, url: '/Audio-blake/BLAKE-011.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 12, url: '/Audio-blake/BLAKE-012.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 }
]
const tracks = [
  { id: 1, url: '/Audio-test/12xmono-001.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 2, url: '/Audio-test/12xmono-002.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 3, url: '/Audio-test/12xmono-003.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 4, url: '/Audio-test/12xmono-004.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 5, url: '/Audio-test/12xmono-005.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 6, url: '/Audio-test/12xmono-006.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 7, url: '/Audio-test/12xmono-007.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 8, url: '/Audio-test/12xmono-008.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 9, url: '/Audio-test/12xmono-009.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 10, url: '/Audio-test/12xmono-010.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 11, url: '/Audio-test/12xmono-011.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 12, url: '/Audio-test/12xmono-012.ogg', x: Math.random() * 10 - 5, z: Math.random() * 10 - 5, rotation: (Math.random() * 360 * Math.PI) / 180 }
]

const Controls = (props) => {
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

function Sound({ url, node, playAudio }) {
  const sound = useRef()
  const ref = useRef()
  const { camera } = useThree()
  const [listener] = useState(() => new THREE.AudioListener())
  const buffer = useLoader(THREE.AudioLoader, url)
  if (playAudio) {
    sound.current.play()
    console.log('hi')
  }
  if (sound.current !== undefined && sound.current.isPlaying && !playAudio) {
    sound.current.pause()
  }

  useEffect(() => {
    sound.current.setBuffer(buffer)
    sound.current.setRefDistance(1)
    sound.current.setLoop(false)

    sound.current.setDirectionalCone(120, 260, 0.3)
    camera.add(listener)

    return () => {
      camera.remove(listener)
      sound.current.pause()
    }
  }, [])
  return (
    <mesh rotation={[0, node.rotation, 0]} key={node.id} position={[node.x, 0, node.z]}>
      <boxBufferGeometry attach="geometry" />
      <meshPhysicalMaterial ref={ref} attach="material" color="#222222" />
      <positionalAudio ref={sound} args={[listener]} />
    </mesh>
  )
}

function Loading({ setPlayReady }) {
  useEffect(() => {
    setPlayReady(false)
    return () => {
      setPlayReady(true)
    }
  })
  return (
    <Dom>
      <div className="loading">
        <p>LOADING...</p>
        <ClipLoader className="spinner" size={150} color={'black'} />
      </div>
    </Dom>
  )
}

function App() {
  const [playReady, setPlayReady] = useState(false)
  const [play, setPlay] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [playAudio, setPlayAudio] = useState(false)
  const [piece, setPiece] = useState(false)

  const onClick = (piece) => {
    setPlay(true)
    setPlayAudio(false)
    setPiece(piece)
  }
  const goHome = () => {
    setPlay(false)
  }
  const closeControls = () => {
    setShowControls(false)
  }
  const handlePlayAudio = () => {
    setPlayAudio(!playAudio)
  }
  console.log(playReady, 'playready')
  return (
    <>
      <div className="transport">
        {playReady && play && (
          <>
            <button className={`control-buttons ${!playReady ? 'hide-buttons' : ''}`} onClick={goHome}>
              <code>Home</code>
            </button>
            <button className={`control-buttons ${!playReady ? 'hide-buttons' : ''}`} onClick={handlePlayAudio}>
              {playAudio ? <code>## STOP ##</code> : <code>|> PLAY |></code>}
            </button>
          </>
        )}
      </div>

      <Canvas camera={{ position: [0, 0, 5] }}>
        {!play && (
          <>
            <Dom position={[10, -5, 0]}>
              <button
                className="playButton"
                onClick={() => {
                  onClick('dave')
                }}>
                {/* <code>|> Cirrus :: Blake Johnston</code> */}
                <code>|> 12XMONO ::::</code>
              </button>
            </Dom>
            <Dom position={[20, -5, -5]}>
              <button
                className="playButton"
                onClick={() => {
                  onClick('blake')
                }}>
                <code>|> Cirrus :: Blake Johnston</code>
              </button>
            </Dom>
            <Dom position={[-1, 2, -1]}>
              <div className="title">
                <code>=== MULTIMONO.SPACE ===</code>
              </div>
            </Dom>
          </>
        )}
        {play && (
          <Suspense fallback={!playReady && <Loading setPlayReady={setPlayReady} />}>
            {showControls && play && playReady && (
              <Dom className="controls" position={[0, 0, -2]}>
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
            {piece === 'dave' && tracks.map((node) => <Sound url={node.url} node={node} playAudio={playAudio} />)}
            {piece === 'blake' && tracksBlake.map((node) => <Sound url={node.url} node={node} playAudio={playAudio} />)}
          </Suspense>
        )}

        <Controls autoRotateSpeed={3} autoRotate={play ? false : true} zoomSpeed={0.25} />
      </Canvas>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
