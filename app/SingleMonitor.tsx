import * as THREE from 'three'
import { useMemo, useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, RenderTexture, PerspectiveCamera, Text } from '@react-three/drei'

// Disable legacy mode for proper color management
THREE.ColorManagement.legacyMode = false

export function SingleMonitor(props) {
  // Reference to the model
  const { nodes, materials } = useGLTF('/scene.gltf')
  
  // Reference for animation
  const monitorRef = useRef()
  
  // State for screen content
  const [active, setActive] = useState(false)
  
  // Animation with useFrame
  useFrame((state) => {
    if (monitorRef.current) {
      monitorRef.current.rotation.y = THREE.MathUtils.lerp(
        monitorRef.current.rotation.y,
        active ? Math.PI / 12 : 0,
        0.05
      )
    }
  })

  return (
    <group {...props}>
      <group ref={monitorRef} 
        onClick={() => setActive(!active)}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}>
        
        {/* Monitor Base */}
        <mesh
          geometry={nodes.Object_4.geometry}
          material={materials.dark_grey}
          position={[0, 0, 0]}
          scale={[1, 1, 1]}
        />
        
        {/* Monitor Frame */}
        <mesh
          geometry={nodes.Object_16.geometry}
          material={materials.light_grey}
          position={[0, 2, 0]}
          scale={[1, 1, 1]}
        />
        
        {/* Screen */}
        <mesh
          geometry={nodes.Object_28.geometry}
          position={[0, 2, 0.12]}
          rotation={[0, 0, 0]}
          scale={[0.95, 0.7, 1]}>
          <meshBasicMaterial>
            <RenderTexture attach="map" anisotropy={16}>
              <PerspectiveCamera
                makeDefault
                manual
                aspect={1 / 1}
                position={[0, 0, 5]}
              />
              <color attach="background" args={['#3f3f3f']} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} />
              
              {/* Your Portfolio Content Here */}
              <Text
                fontSize={0.6}
                color="#ffffff"
                position={[0, 0.5, 0]}
                anchorX="center"
                anchorY="middle">
                My Portfolio
              </Text>
              
              <Text
                fontSize={0.2}
                color="#dddddd"
                position={[0, 0, 0]}
                anchorX="center"
                anchorY="middle">
                Click to interact
              </Text>
              
              {/* You can add more components inside the screen here */}
              <mesh position={[0, -0.6, 0]} scale={0.4}>
                <boxGeometry />
                <meshStandardMaterial color="#5f5fff" />
              </mesh>
            </RenderTexture>
          </meshBasicMaterial>
        </mesh>
      </group>
    </group>
  )
}

// Preload the model
useGLTF.preload('/scene.gltf')