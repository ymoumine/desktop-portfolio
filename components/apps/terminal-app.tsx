"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"

type CommandHistory = {
  command: string
  output: string
}

export default function TerminalApp() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "",
      output: 'Welcome to YassineOS Terminal v1.0.0\nType "help" to see available commands.',
    },
  ])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    // Scroll to bottom when history changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle up arrow for history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault()

      const commandHistory = history.filter((item) => item.command).map((item) => item.command)

      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    }

    // Handle down arrow for history navigation
    if (e.key === "ArrowDown") {
      e.preventDefault()

      const commandHistory = history.filter((item) => item.command).map((item) => item.command)

      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    }

    // Handle enter to execute command
    if (e.key === "Enter") {
      executeCommand()
    }
  }

  const executeCommand = () => {
    if (!input.trim()) return

    const command = input.trim().toLowerCase()
    let output = ""

    // Process commands
    switch (command) {
      case "help":
        output = `
Available commands:
  help        - Show this help message
  about       - Display information about me
  skills      - List my technical skills
  projects    - Show my projects
  contact     - Display contact information
  clear       - Clear the terminal
  date        - Show current date and time
  echo [text] - Display the text
  whoami      - Display current user
  ls          - List files and directories
`
        break

      case "about":
        output = `
Yassine Developer
---------------
Full Stack Developer with 5+ years of experience building modern web applications.
Specialized in React, Next.js, and Node.js with a strong focus on creating
performant and accessible user interfaces.
`
        break

      case "skills":
        output = `
Technical Skills
---------------
Frontend: React, Next.js, Vue.js, TypeScript, JavaScript, TailwindCSS
Backend: Node.js, Express, NestJS, GraphQL, REST API
Database: MongoDB, PostgreSQL, MySQL
DevOps: AWS, Vercel, Netlify, Docker
Other: Git, CI/CD, Testing, Agile
`
        break

      case "projects":
        output = `
Projects
---------------
1. E-Commerce Platform - React, Node.js, MongoDB, Stripe
2. AI Image Generator - Next.js, OpenAI API, TailwindCSS
3. Task Management App - Vue.js, Firebase, Vuetify
4. Weather Dashboard - React, Weather API, Chart.js
5. Portfolio OS - Next.js, TailwindCSS, React Draggable

Type "open projects" to open the Projects window.
`
        break

      case "contact":
        output = `
Contact Information
---------------
Email: contact@example.com
GitHub: github.com/username
LinkedIn: linkedin.com/in/username
Twitter: twitter.com/username
`
        break

      case "clear":
        setHistory([])
        setInput("")
        return

      case "date":
        output = new Date().toString()
        break

      case "whoami":
        output = "visitor@yassineos:~$"
        break

      case "ls":
        output = `
Documents/
Projects/
Resume.pdf
About.txt
Contact.txt
`
        break

      case "open projects":
        output = "Opening Projects window..."
        // Simulate opening projects window
        setTimeout(() => {
          const projectsButton = document.querySelector('[data-app="projects"]') as HTMLElement
          projectsButton?.click()
        }, 500)
        break

      default:
        // Handle echo command
        if (command.startsWith("echo ")) {
          output = command.substring(5)
        } else {
          output = `Command not found: ${command}. Type "help" for available commands.`
        }
    }

    setHistory([...history, { command: input, output: output.trim() }])
    setInput("")
    setHistoryIndex(-1)
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 text-green-400 font-mono p-2 overflow-hidden" onClick={focusInput}>
      <div ref={terminalRef} className="flex-1 overflow-y-auto pb-2 whitespace-pre-wrap">
        {history.map((item, index) => (
          <div key={index}>
            {item.command && (
              <div className="flex items-start">
                <span className="text-yellow-400 mr-1">visitor@yassineos:~$</span>
                <span>{item.command}</span>
              </div>
            )}
            <div className="pl-0 mb-2">{item.output}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center border-t border-gray-700 pt-2">
        <span className="text-yellow-400 mr-1">visitor@yassineos:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400"
          autoFocus
        />
      </div>
    </div>
  )
}

