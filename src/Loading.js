import React, { useEffect } from 'react'
import ClipLoader from 'react-spinners/ScaleLoader'
import { Dom } from 'react-three-fiber'
import './styles.css'

export default function Loading({ setPlayReady }) {
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
