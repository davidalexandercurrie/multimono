import React, { Suspense } from 'react'
import * as THREE from 'three'
import { Dom } from 'react-three-fiber'
import Loading from './Loading'
import Sound from './Sound'
import './styles.css'
import { Geometry } from 'three'

const Plane = () => (
  <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    <circleBufferGeometry attach="geometry" args={[15, 15]} />
    <meshPhysicalMaterial attach="material" color="#324353" />
  </mesh>
)

// const tracks = [
//   { id: 1, url: '/Audio/12xmonobrowser-001.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 2, url: '/Audio/12xmonobrowser-002.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 3, url: '/Audio/12xmonobrowser-003.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 4, url: '/Audio/12xmonobrowser-004.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 5, url: '/Audio/12xmonobrowser-005.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 6, url: '/Audio/12xmonobrowser-006.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 7, url: '/Audio/12xmonobrowser-007.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 8, url: '/Audio/12xmonobrowser-008.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 9, url: '/Audio/12xmonobrowser-009.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 10, url: '/Audio/12xmonobrowser-010.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 11, url: '/Audio/12xmonobrowser-011.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
//   { id: 12, url: '/Audio/12xmonobrowser-012.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 }
// ]
const tracksBlake = [
  { id: 1, url: '/Audio-blake/BLAKE-001.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 2, url: '/Audio-blake/BLAKE-002.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 3, url: '/Audio-blake/BLAKE-003.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 4, url: '/Audio-blake/BLAKE-004.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 5, url: '/Audio-blake/BLAKE-005.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 6, url: '/Audio-blake/BLAKE-006.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 7, url: '/Audio-blake/BLAKE-007.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 8, url: '/Audio-blake/BLAKE-008.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 9, url: '/Audio-blake/BLAKE-009.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 10, url: '/Audio-blake/BLAKE-010.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 11, url: '/Audio-blake/BLAKE-011.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 12, url: '/Audio-blake/BLAKE-012.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 }
]
const tracksAlexis = [
  { id: 1, url: '/Audio-alexis/alexisweaver-001.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 2, url: '/Audio-alexis/alexisweaver-002.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 3, url: '/Audio-alexis/alexisweaver-003.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 4, url: '/Audio-alexis/alexisweaver-004.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 5, url: '/Audio-alexis/alexisweaver-005.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 6, url: '/Audio-alexis/alexisweaver-006.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 7, url: '/Audio-alexis/alexisweaver-007.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 8, url: '/Audio-alexis/alexisweaver-008.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 9, url: '/Audio-alexis/alexisweaver-009.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  {
    id: 10,
    url: '/Audio-alexis/alexisweaver-010.ogg',
    x: Math.random() * 20 - 10,
    z: Math.random() * 20 - 10,
    rotation: (Math.random() * 360 * Math.PI) / 180
  },
  {
    id: 11,
    url: '/Audio-alexis/alexisweaver-011.ogg',
    x: Math.random() * 20 - 10,
    z: Math.random() * 20 - 10,
    rotation: (Math.random() * 360 * Math.PI) / 180
  },
  { id: 12, url: '/Audio-alexis/alexisweaver-012.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 }
]
const tracks = [
  { id: 1, url: '/Audio-test/12xmono-001.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 2, url: '/Audio-test/12xmono-002.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 3, url: '/Audio-test/12xmono-003.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 4, url: '/Audio-test/12xmono-004.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 5, url: '/Audio-test/12xmono-005.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 6, url: '/Audio-test/12xmono-006.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 7, url: '/Audio-test/12xmono-007.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 8, url: '/Audio-test/12xmono-008.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 9, url: '/Audio-test/12xmono-009.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 10, url: '/Audio-test/12xmono-010.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 11, url: '/Audio-test/12xmono-011.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 },
  { id: 12, url: '/Audio-test/12xmono-012.ogg', x: Math.random() * 20 - 10, z: Math.random() * 20 - 10, rotation: (Math.random() * 360 * Math.PI) / 180 }
]

export default function ListeningScene({ playReady, setPlayReady, piece, setShowControls, showControls, play, playAudio }) {
  console.log('listening SCENE')

  const closeControls = () => {
    setShowControls(false)
  }
  return (
    <Suspense fallback={<Loading setPlayReady={setPlayReady} />}>
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
      <fog attach="fog" args={['#324398', 8, 15]} />
      <spotLight
        penumbra={1}
        castShadow
        intensity={0.1}
        angle={Math.PI / 10}
        position={[10, 10, 10]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight penumbra={1} intensity={0.5} castShadow position={[0, 5, 10]}></spotLight>
      <ambientLight />
      <pointLight intensity={4} />
      <Plane />
      {piece === 'dave' && tracks.map((node) => <Sound url={node.url} node={node} playAudio={playAudio} />)}
      {piece === 'blake' && tracksBlake.map((node) => <Sound url={node.url} node={node} playAudio={playAudio} />)}
      {piece === 'alexis' && tracksAlexis.map((node) => <Sound url={node.url} node={node} playAudio={playAudio} />)}
    </Suspense>
  )
}
