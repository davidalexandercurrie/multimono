import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useThree, useLoader } from 'react-three-fiber'

export default function Sound({ url, node, playAudio }) {
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

    // sound.current.setDirectionalCone(120, 260, 0.3)
    camera.add(listener)

    return () => {
      camera.remove(listener)
      sound.current.pause()
    }
  }, [])
  return (
    <mesh castShadow rotation={[0, node.rotation, 0]} key={node.id} position={[node.x, 0, node.z]}>
      <boxBufferGeometry attach="geometry" />
      <meshPhysicalMaterial ref={ref} attach="material" color="#324353" />
      <positionalAudio ref={sound} args={[listener]} />
    </mesh>
  )
}
