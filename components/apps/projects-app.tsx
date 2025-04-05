"use client"

import { useState, useEffect } from "react"
import { Folder, Github, ExternalLink } from "lucide-react"

type Project = {
  id: number
  name: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  image?: string
  featured: boolean
}

const SAMPLE_PROJECTS: Project[] = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with payment processing, user authentication, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/username/ecommerce",
    demo: "https://ecommerce-demo.vercel.app",
    image: "/placeholder.svg?height=200&width=320",
    featured: true,
  },
  {
    id: 2,
    name: "AI Image Generator",
    description: "Web application that generates images based on text prompts using AI models.",
    technologies: ["Next.js", "OpenAI API", "TailwindCSS"],
    github: "https://github.com/username/ai-image-gen",
    demo: "https://ai-image-gen.vercel.app",
    image: "/placeholder.svg?height=200&width=320",
    featured: true,
  },
  {
    id: 3,
    name: "Task Management App",
    description: "A collaborative task management application with real-time updates.",
    technologies: ["Vue.js", "Firebase", "Vuetify"],
    github: "https://github.com/username/task-manager",
    demo: "https://task-manager-demo.vercel.app",
    image: "/placeholder.svg?height=200&width=320",
    featured: false,
  },
  {
    id: 4,
    name: "Weather Dashboard",
    description: "Real-time weather dashboard with location search and 7-day forecasts.",
    technologies: ["React", "Weather API", "Chart.js"],
    github: "https://github.com/username/weather-app",
    demo: "https://weather-dashboard-demo.vercel.app",
    image: "/placeholder.svg?height=200&width=320",
    featured: false,
  },
  {
    id: 5,
    name: "Portfolio OS",
    description: "This Windows-style portfolio website you're currently using!",
    technologies: ["Next.js", "TailwindCSS", "React Draggable"],
    github: "https://github.com/username/portfolio-os",
    demo: "#",
    image: "/placeholder.svg?height=200&width=320",
    featured: true,
  },
]

export default function ProjectsApp() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState<"all" | "featured">("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    const fetchProjects = async () => {
      setLoading(true)
      // In a real app, you would fetch from an API
      // const response = await fetch('/api/projects');
      // const data = await response.json();

      // Using sample data for demo
      setTimeout(() => {
        setProjects(SAMPLE_PROJECTS)
        setLoading(false)
      }, 800)
    }

    fetchProjects()
  }, [])

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.featured)

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold flex items-center">
          <Folder className="mr-2 text-blue-500" size={20} />
          My Projects
        </h2>

        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${filter === "featured" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("featured")}
          >
            Featured
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pb-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-100 relative">
                {project.image ? (
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = `/placeholder.svg?height=160&width=320`
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-medium text-lg mb-1">{project.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{project.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-gray-700 hover:text-blue-500"
                    >
                      <Github size={16} className="mr-1" />
                      Code
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-gray-700 hover:text-blue-500"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

