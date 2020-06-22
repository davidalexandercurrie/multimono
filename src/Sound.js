import React, { useRef, useState, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import { useThree, useLoader } from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three'

export default function Sound({ url, node, playAudio }) {
  const sound = useRef()
  const analyzer = useRef()
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const { camera } = useThree()
  const [listener] = useState(() => new THREE.AudioListener())
  const buffer = useLoader(THREE.AudioLoader, url)
  const props = useSpring({
    color: hovered ? '#123254' : '#324353'
  })

  const onHover = useCallback(
    (e, value) => {
      e.stopPropagation() // stop it at the first intersection
      setHovered(value)
    },
    [setHovered]
  )
  //...

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
    sound.current.setVolume(1)
    // sound.current.setDirectionalCone(120, 260, 0.3)
    camera.add(listener)
    console.log(camera.position.x)
    return () => {
      camera.remove(listener)
      sound.current.pause()
    }
  }, [])

  return (
    <a.mesh
      onPointerOver={(e) => onHover(e, true)}
      onPointerOut={(e) => onHover(e, false)}
      castShadow
      rotation={[0, node.rotation, 0]}
      key={node.id}
      position={[node.x / 1.5, 0, node.z / 1.5]}>
      <boxBufferGeometry attach="geometry" />
      <a.meshPhysicalMaterial ref={ref} attach="material" color={props.color} />
      <positionalAudio ref={sound} args={[listener]} />
      {/* {buffer && <AudioAnalyser ref={analyzer} args={[buffer, 32]} />} */}
    </a.mesh>
  )
}
