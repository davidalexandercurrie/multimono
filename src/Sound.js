import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useThree, useLoader } from 'react-three-fiber'
import { AudioAnalyser } from 'three'

export default function Sound({ url, node, playAudio }) {
  const sound = useRef()
  const analyzer = useRef()
  const ref = useRef()
  const { camera } = useThree()
  const [listener] = useState(() => new THREE.AudioListener())
  const buffer = useLoader(THREE.AudioLoader, url)

  if (playAudio) {
    sound.current.play()
  }
  if (sound.current !== undefined && sound.current.isPlaying && !playAudio) {
    sound.current.pause()
  }

  useEffect(() => {
    sound.current.setBuffer(buffer)
    sound.current.setRefDistance(1)
    sound.current.setLoop(false)
    // sound.current.setDirectionalCone(120, 260, 0.3)
    camera.add(listener)
    return () => {
      camera.remove(listener)
      sound.current.pause()
    }
  }, [])
  useEffect(() => {
    console.log(buffer)
  }, [buffer])

  return (
    <mesh castShadow rotation={[0, node.rotation, 0]} key={node.id} position={[node.x / 2, 0, node.z / 2]}>
      <boxBufferGeometry attach="geometry" />
      <meshPhysicalMaterial ref={ref} attach="material" color="#324353" />
      <positionalAudio ref={sound} args={[listener]} />
      {/* {buffer && <AudioAnalyser ref={analyzer} args={[buffer, 32]} />} */}
    </mesh>
  )
}
