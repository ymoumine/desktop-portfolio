"use client"

import type React from "react"

import { useState } from "react"
import DesktopIcon from "@/components/desktop-icon"
import { useWindows } from "@/components/windows-provider"
import ProjectsApp from "@/components/apps/projects-app"
import ResumeApp from "@/components/apps/resume-app"
import AboutApp from "@/components/apps/about-app"
import GithubApp from "@/components/apps/github-app"
import SpotifyApp from "@/components/apps/spotify-app"
import TerminalApp from "@/components/apps/terminal-app"
import ContextMenu from "@/components/context-menu"

export default function Desktop() {
  const { addWindow } = useWindows()
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  const closeContextMenu = () => {
    setContextMenu(null)
  }

  const openProjects = () => {
    addWindow({
      id: "projects",
      title: "Projects",
      icon: "/icons/folder.png",
      component: <ProjectsApp />,
      width: 800,
      height: 500,
    })
  }

  const openResume = () => {
    addWindow({
      id: "resume",
      title: "Resume",
      icon: "/icons/pdf.png",
      component: <ResumeApp />,
      width: 700,
      height: 800,
    })
  }

  const openGithub = () => {
    addWindow({
      id: "github",
      title: "GitHub",
      icon: "/icons/github.png",
      component: <GithubApp />,
      width: 800,
      height: 600,
    })
  }

  const openSpotify = () => {
    addWindow({
      id: "spotify",
      title: "Spotify Player",
      icon: "/icons/spotify.png",
      component: <SpotifyApp />,
      width: 400,
      height: 600,
    })
  }

  const openAbout = () => {
    addWindow({
      id: "about",
      title: "About Me",
      icon: "/icons/portal.png",
      component: <AboutApp />,
      width: 600,
      height: 400,
    })
  }

  const openTerminal = () => {
    // add pop up animation
    addWindow({
      id: "terminal",
      title: "Terminal",
      icon: "/icons/terminal.png",
      component: <TerminalApp />,
      width: 700,
      height: 400,
    })
  }

  return (
    <div
  className="h-[calc(100vh-40px)] w-[10%] p-4 grid grid-cols-2 grid-rows-6 gap-20 flex justify-items-start items-start"
  onContextMenu={handleContextMenu}
  onClick={closeContextMenu}
>
  <DesktopIcon
    icon="/icons/folder.png?height=40&width=40"
    label="Projects"
    onClick={openProjects}
    position={{ col: 1, row: 1 }}
    iconType="projects"
  />

  <DesktopIcon
    icon="/icons/pdf.png"
    label="Resume"
    onClick={openResume}
    position={{ col: 1, row: 2 }}
    iconType="resume"
  />

  <DesktopIcon
    icon="/icons/github.png?height=40&width=40"
    label="GitHub"
    onClick={openGithub}
    position={{ col: 1, row: 3 }}
    iconType="github"
  />

  <DesktopIcon
    icon="/icons/spotify.png?height=40&width=40"
    label="Spotify"
    onClick={openSpotify}
    position={{ col: 1, row: 4 }}
    iconType="spotify"
  />

  <DesktopIcon
    icon="/icons/portal.png?height=40&width=40"
    label="About Me"
    onClick={openAbout}
    position={{ col: 1, row: 5 }}
    iconType="about"
  />

  <DesktopIcon
    icon="/icons/terminal.png?height=40&width=40"
    label="Terminal"
    onClick={openTerminal}
    position={{ col: 2, row: 6 }}
    iconType="terminal"
  />

<DesktopIcon
    icon="/icons/mail.png?height=40&width=40"
    label="Contacts"
    onClick={openTerminal}
    position={{ col: 2, row: 2 }}
    iconType="terminal"
  />



  {contextMenu && (
    <ContextMenu
      x={contextMenu.x}
      y={contextMenu.y}
      onClose={closeContextMenu}
      options={[
        { label: "View", onClick: openAbout },
        { label: "Refresh", onClick: () => {} },
        { label: "Terminal", onClick: openTerminal },
        { label: "Display Settings", onClick: () => {} },
      ]}
    />
  )}
</div>
  )
}

