"use client"

import { useState, useEffect } from "react"
import { Github, Star, GitFork, Clock } from "lucide-react"

type Repository = {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  updated_at: string
  language: string
  topics: string[]
}

type GitHubUser = {
  login: string
  avatar_url: string
  name: string
  bio: string
  followers: number
  following: number
  public_repos: number
  html_url: string
}

// Sample data for demo purposes
const SAMPLE_USER: GitHubUser = {
  login: "devyassine",
  avatar_url: "/icons/folder.png?height=96&width=96",
  name: "Yassine Developer",
  bio: "Full Stack Developer passionate about React, Next.js, and building great user experiences",
  followers: 120,
  following: 80,
  public_repos: 25,
  html_url: "https://github.com/username",
}

const SAMPLE_REPOS: Repository[] = [
  {
    id: 1,
    name: "portfolio-os",
    description: "A Windows-style portfolio website built with Next.js and TailwindCSS",
    html_url: "https://github.com/username/portfolio-os",
    stargazers_count: 45,
    forks_count: 12,
    updated_at: "2023-04-15T10:30:00Z",
    language: "TypeScript",
    topics: ["nextjs", "react", "portfolio", "tailwindcss"],
  },
  {
    id: 2,
    name: "ai-image-generator",
    description: "Web app that generates images from text prompts using AI",
    html_url: "https://github.com/username/ai-image-generator",
    stargazers_count: 78,
    forks_count: 23,
    updated_at: "2023-03-22T14:15:00Z",
    language: "JavaScript",
    topics: ["ai", "openai", "nextjs", "image-generation"],
  },
  {
    id: 3,
    name: "react-component-library",
    description: "A collection of reusable React components with TypeScript and Storybook",
    html_url: "https://github.com/username/react-component-library",
    stargazers_count: 132,
    forks_count: 34,
    updated_at: "2023-02-10T09:45:00Z",
    language: "TypeScript",
    topics: ["react", "components", "ui-library", "storybook"],
  },
  {
    id: 4,
    name: "node-api-starter",
    description: "A starter template for Node.js APIs with Express, TypeScript, and MongoDB",
    html_url: "https://github.com/username/node-api-starter",
    stargazers_count: 95,
    forks_count: 28,
    updated_at: "2023-01-05T16:20:00Z",
    language: "TypeScript",
    topics: ["nodejs", "express", "api", "mongodb", "starter"],
  },
  {
    id: 5,
    name: "e-commerce-platform",
    description: "Full-stack e-commerce platform with React, Node.js, and Stripe integration",
    html_url: "https://github.com/username/e-commerce-platform",
    stargazers_count: 67,
    forks_count: 19,
    updated_at: "2022-12-18T11:10:00Z",
    language: "JavaScript",
    topics: ["ecommerce", "react", "nodejs", "stripe", "mongodb"],
  },
]

export default function GithubApp() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"repos" | "activity">("repos")

  useEffect(() => {
    // Simulate API fetch
    const fetchGithubData = async () => {
      setLoading(true)

      // In a real app, you would fetch from the GitHub API
      // const userResponse = await fetch('https://api.github.com/users/username');
      // const userData = await userResponse.json();
      // setUser(userData);

      // const reposResponse = await fetch('https://api.github.com/users/username/repos?sort=updated');
      // const reposData = await reposResponse.json();
      // setRepos(reposData);

      // Using sample data for demo
      setTimeout(() => {
        setUser(SAMPLE_USER)
        setRepos(SAMPLE_REPOS)
        setLoading(false)
      }, 1000)
    }

    fetchGithubData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-500",
      JavaScript: "bg-yellow-400",
      Python: "bg-green-500",
      Java: "bg-red-500",
      Go: "bg-cyan-500",
      Rust: "bg-orange-500",
      C: "bg-gray-500",
      "C++": "bg-pink-500",
      "C#": "bg-purple-500",
      PHP: "bg-indigo-500",
      Ruby: "bg-red-600",
      Swift: "bg-orange-600",
      Kotlin: "bg-purple-600",
      HTML: "bg-orange-500",
      CSS: "bg-blue-400",
    }

    return colors[language] || "bg-gray-400"
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Github size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-700">GitHub data not available</h3>
          <p className="text-gray-500">Unable to load GitHub profile information.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold flex items-center">
          <Github className="mr-2" size={20} />
          GitHub Profile
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* User Profile */}
          <div className="md:w-1/3">
            <div className="bg-gray-50 rounded-lg p-4 border">
              <div className="flex flex-col items-center text-center mb-4">
                <img
                  src={user.avatar_url || "/icons/folder.png"}
                  alt={user.name}
                  className="w-24 h-24 rounded-full mb-3"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = `/icons/folder.png?height=96&width=96`
                  }}
                />
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{user.login}</p>
                <p className="text-gray-700 text-sm">{user.bio}</p>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium">{user.public_repos}</div>
                  <div className="text-xs text-gray-500">Repos</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium">{user.followers}</div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
                <div className="bg-white p-2 rounded border">
                  <div className="font-medium">{user.following}</div>
                  <div className="text-xs text-gray-500">Following</div>
                </div>
              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2 bg-gray-800 text-white text-center rounded text-sm hover:bg-gray-700"
              >
                View Profile
              </a>
            </div>
          </div>

          {/* Repositories */}
          <div className="md:w-2/3">
            <div className="mb-4 border-b">
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "repos" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
                  onClick={() => setActiveTab("repos")}
                >
                  Repositories
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${activeTab === "activity" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
                  onClick={() => setActiveTab("activity")}
                >
                  Activity
                </button>
              </div>
            </div>

            {activeTab === "repos" ? (
              <div className="space-y-4">
                {repos.map((repo) => (
                  <div key={repo.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-medium hover:underline"
                      >
                        {repo.name}
                      </a>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex items-center mr-3">
                          <Star size={16} className="mr-1" />
                          {repo.stargazers_count}
                        </div>
                        <div className="flex items-center">
                          <GitFork size={16} className="mr-1" />
                          {repo.forks_count}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 text-sm mb-3">{repo.description}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {repo.topics.map((topic) => (
                        <span key={topic} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-1 ${getLanguageColor(repo.language)}`}></span>
                        {repo.language}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        Updated on {formatDate(repo.updated_at)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 border text-center">
                <h3 className="text-lg font-medium mb-2">GitHub Activity</h3>
                <div className="bg-white border rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 70 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-full aspect-square rounded-sm ${
                          Math.random() > 0.7 ? `bg-green-${Math.floor(Math.random() * 3 + 3)}00` : "bg-gray-200"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">View more detailed activity on my GitHub profile</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

