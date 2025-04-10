"use client"

import { useState, useEffect } from "react"
import Desktop from "@/components/desktop"
import Taskbar from "@/components/taskbar"
import BootScreen from "@/components/boot-screen"
import { WindowsProvider } from "@/components/windows-provider"
import Clippy from "@/components/clippy"
import StickyNoteAnimation from "@/components/StickyNoteAnimation"

export default function Home() {
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    // Simulate boot time
    const timer = setTimeout(() => {
      setBooting(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  // if (booting) {
  //   return <BootScreen />
  // }

  return (
    <WindowsProvider>
      {/* add a monitor like style border */}
      <div className="h-screen w-screen overflow-hidden relative border-8"
        // {booting && <BootScreen />}
      style={{ backgroundImage: "url('/desktop.png')", backgroundSize: "cover" }}>
        <Desktop />
        {/* <Clippy /> */}
        <StickyNoteAnimation />
        <Taskbar />
      </div>
    </WindowsProvider>
  )
{/* <Canvas camera={{ position: [0, 2, 5] }}>
<ambientLight intensity={0.5} />
<directionalLight position={[10, 10, 10]} intensity={1} />
<SingleMonitor position={[0, 0, 0]} />
<OrbitControls enableZoom={true} />
</Canvas> */}
  
}

