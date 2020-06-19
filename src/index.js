import ReactDOM from 'react-dom'
import * as THREE from 'three'
import React, { useRef, useState, Suspense } from 'react'
import { Dom, Canvas, extend, useThree, useFrame } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import useInputState from './useInputState'

import './styles.css'
import ListeningScene from './ListeningScene'

extend({ OrbitControls })

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
      maxDistance={15}
      args={[camera, gl.domElement]}
      {...props}
    />
  )
}

function App() {
  const [playReady, setPlayReady] = useState(false)
  const [play, setPlay] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [playAudio, setPlayAudio] = useState(false)
  const [piece, setPiece] = useState(false)
  const [value, handleChange, reset] = useInputState('')
  const [bgimage, setBgimage] = useState('/background3.jpg')

  const onClick = (piece) => {
    setPlay(true)
    setPlayAudio(false)
    setPiece(piece)
  }
  const goHome = () => {
    setPlay(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const string = value
    setBgimage(string)
    reset()
  }

  const handlePlayAudio = () => {
    setPlayAudio(!playAudio)
  }
  console.log(playReady, 'playready')
  return (
    <>
      <div className="background" style={{ background: `url(${bgimage}) no-repeat center center fixed` }}></div>

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
        {!play && (
          <form onSubmit={handleSubmit}>
            <label className={`control-buttons ${playReady ? 'hide-buttons' : ''}`}>
              Background Image URL:
              <input onChange={handleChange} value={value} className="url-input" type="text" name="url"></input>
            </label>
            <input className={`control-buttons ${playReady ? 'hide-buttons' : ''}`} type="submit" value="++" />
          </form>
        )}
      </div>

      <Canvas
        camera={{ position: [0, 0, 5] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}>
        {!play && (
          <>
            <Dom position={[10, -5, 0]}>
              <button
                className="playButton"
                onClick={() => {
                  onClick('dave')
                }}>
                <code>|> 12XMONO :: David Currie</code>
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
          <ListeningScene
            playReady={playReady}
            setPlayReady={setPlayReady}
            setShowControls={setShowControls}
            showControls={showControls}
            piece={piece}
            play={play}
            playAudio={playAudio}
          />
        )}

        <Controls autoRotateSpeed={3} autoRotate={play ? false : true} zoomSpeed={0.25} />
      </Canvas>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
