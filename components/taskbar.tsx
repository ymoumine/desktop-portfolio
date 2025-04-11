"use client"

import { useState, useEffect } from "react"
import { useWindows } from "@/components/windows-provider"
import { cn } from "@/lib/utils"
import { Search, PowerIcon } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Image from "next/image"
import Link from "next/link"
// import { AppIcon } from "@/components/app-icon"
// import { RecentFile } from "@/components/recent-file"

// Interface for GitHub stats
interface GitHubStats {
  totalContributions: number
  contributionStreak: number
  languages: { name: string; percentage: number }[]
  commitData: { date: string; count: number }[]
}

// Interface for LeetCode stats
interface LeetCodeStats {
  totalSolved: number
  streak: number
  difficulty: { easy: number; medium: number; hard: number }
}

// Interface for tech news
interface TechNewsItem {
  id: string
  title: string
  source: string
  url: string
  publishedAt: string
  summary: string
}

export default function Taskbar() {
  const { windows, activeWindowId, setActiveWindow, restoreMinimizedWindow } = useWindows()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showOverlay, setShowOverlay] = useState(false)
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null)
  const [techNews, setTechNews] = useState<TechNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'tech' | 'github' | 'leetcode'>('tech')

  // Effect for updating the time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleDoubleClick = (e) => {
      e.preventDefault()
    }
    window.addEventListener("dblclick", handleDoubleClick)
    return () => {
      window.removeEventListener("dblclick", handleDoubleClick)
    }
  }, [])

  // Effect for fetching data when overlay is shown
  useEffect(() => {
    if (showOverlay && loading) {
      fetchData()
    }
  }, [showOverlay, loading])

  // Effect to close overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const overlay = document.getElementById('start-overlay')
      const startButton = document.getElementById('start-button')
      
      if (overlay && !overlay.contains(event.target as Node) && 
          startButton && !startButton.contains(event.target as Node)) {
        setShowOverlay(false)
      }
    }

    if (showOverlay) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showOverlay])

  const fetchData = async () => {
    setLoading(true)
    
    try {
      // Mock GitHub data - replace with actual API calls in production
      const mockGithubStats: GitHubStats = {
        totalContributions: 867,
        contributionStreak: 12,
        languages: [
          { name: "JavaScript", percentage: 45 },
          { name: "TypeScript", percentage: 30 },
          { name: "Python", percentage: 15 },
          { name: "CSS", percentage: 10 }
        ],
        commitData: Array.from({ length: 12 }, (_, i) => ({
          date: `${i + 1}/1`,
          count: Math.floor(Math.random() * 10) + 1
        }))
      }
      
      // Mock LeetCode data - replace with actual API calls in production
      const mockLeetcodeStats: LeetCodeStats = {
        totalSolved: 152,
        streak: 8,
        difficulty: { easy: 78, medium: 62, hard: 12 }
      }
      
      // Mock tech news - replace with actual API calls in production
      const mockTechNews: TechNewsItem[] = [
        {
          id: "1",
          title: "Next.js 14 Released with Major Performance Improvements",
          source: "Vercel Blog",
          url: "#",
          publishedAt: "2025-04-10T14:35:00Z",
          summary: "The latest version brings server actions out of beta and introduces a new rendering model."
        },
        {
          id: "2",
          title: "TypeScript 5.5 Beta Announced with Enhanced Type Inference",
          source: "Microsoft",
          url: "#",
          publishedAt: "2025-04-09T10:22:00Z",
          summary: "The new version improves performance and adds features for more accurate type checking."
        },
        {
          id: "3",
          title: "React Suspense for Data Fetching Now Stable",
          source: "React Blog",
          url: "#",
          publishedAt: "2025-04-08T16:45:00Z",
          summary: "After being in experimental for years, Suspense for Data Fetching is now recommended for production use."
        }
      ]
      
      setGithubStats(mockGithubStats)
      setLeetcodeStats(mockLeetcodeStats)
      setTechNews(mockTechNews)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
  }

  const handleTaskbarItemClick = (windowId: string) => {
    const clickedWindow = windows.find((w) => w.id === windowId)

    if (clickedWindow) {
      if (clickedWindow.isMinimized) {
        restoreMinimizedWindow(windowId)
      } else if (activeWindowId === windowId) {
        restoreMinimizedWindow(windowId)
      } else {
        setActiveWindow(windowId)
      }
    }
  }

  const toggleOverlay = () => {
    setShowOverlay(prev => !prev)
    if (!showOverlay && loading) {
      fetchData()
    }
  }

  return (
    <>
      <div id="taskbar" className="absolute bottom-0 left-0 right-0 h-10 bg-gray-800/90 backdrop-blur-sm flex items-center px-2 z-[1000]">
        <div className="flex items-center">
          <button 
            id="start-button"
            className="w-8 h-8 rounded-full overflow-hidden hover:bg-blue-500/20 flex items-center justify-center"
            onClick={toggleOverlay}
          >
            <img src="/icons/start.png" alt="Start" className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 flex items-center px-2 space-x-1 overflow-x-auto">
          {windows.map((window) => (
            <button
              key={window.id}
              className={cn(
                "h-8 w-10 px-2 flex items-center rounded hover:bg-white/10 taskbar-item",
                activeWindowId === window.id ? "bg-white/10" : ""
              )}
              onClick={() => handleTaskbarItemClick(window.id)}
            >
              <img src={window.icon || "/icons/folder.png?height=16&width=16"} alt="" className="w-6 h-6 mr-2 underline" />
              <span className="text-white text-xs truncate">{window.title}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-white text-xs px-2 py-1 rounded hover:bg-white/10">
            <div>{formatTime(currentTime)}</div>
            <div className="text-[10px]">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>

      {/* Windows 11 Style Start Menu Overlay */}
      {showOverlay && (
        <div 
          id="start-overlay"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[520px] max-h-[80vh] bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden z-[1001]"
        >
          {/* Search Bar */}
          <div className="p-4">
            <div className="relative">
              <div className="flex items-center bg-gray-900/90 backdrop-blur-sm rounded-full px-4 py-2">
                <Search className="w-5 h-5 text-[#757575] mr-2" />
                <input
                  type="text"
                  placeholder="Search for apps, settings, and documents"
                  className="bg-transparent border-none text-[#c4c4c4] w-full focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Developer Stats & News Section */}
          <div className="px-4 pb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[#ffffff] font-medium">Developer Dashboard</h2>
              <div className="flex space-x-2">
                <button 
                  className={`text-xs px-3 py-1 rounded-sm ${activeTab === 'tech' ? 'bg-blue-600 text-white' : 'bg-gray-900 backdrop-blur-sm text-[#c4c4c4]'}`}
                  onClick={() => setActiveTab('tech')}
                >
                  Tech News
                </button>
                <button 
                  className={`text-xs px-3 py-1 rounded-sm ${activeTab === 'github' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-[#c4c4c4]'}`}
                  onClick={() => setActiveTab('github')}
                >
                  GitHub
                </button>
                <button 
                  className={`text-xs px-3 py-1 rounded-sm ${activeTab === 'leetcode' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-[#c4c4c4]'}`}
                  onClick={() => setActiveTab('leetcode')}
                >
                  LeetCode
                </button>
              </div>
            </div>

            {/* Tab Content Area - Fixed Height for Consistency */}
            <div className="h-[53vh] overflow-y-auto pr-2">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  {/* Tech News Tab */}
                  {activeTab === 'tech' && (
                    <div className="space-y-3">
                      {techNews.map(article => (
                        <div key={article.id} className="bg-gray-900 rounded-lg p-3 hover:bg-gray-800 cursor-pointer">
                          <h4 className="text-blue-400 text-sm font-medium">{article.title}</h4>
                          <p className="text-gray-300 text-xs mt-1">{article.summary}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-400 text-xs">{article.source}</span>
                            <span className="text-gray-400 text-xs">
                              {new Date(article.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* GitHub Stats Tab */}
                  {activeTab === 'github' && (
                    <div className="space-y-4">
                      {/* Summary Stats */}
                      <div className="flex space-x-4">
                        <div className="flex-1 bg-[#202020] p-3 rounded-lg">
                          <p className="text-gray-400 text-xs">Total Contributions</p>
                          <p className="text-white text-xl font-medium">{githubStats?.totalContributions}</p>
                        </div>
                        <div className="flex-1 bg-[#202020] p-3 rounded-lg">
                          <p className="text-gray-400 text-xs">Current Streak</p>
                          <p className="text-white text-xl font-medium">{githubStats?.contributionStreak} days</p>
                        </div>
                      </div>
                      
                      {/* Language Distribution */}
                      <div className="bg-[#202020] p-3 rounded-lg">
                        <p className="text-gray-400 text-xs mb-2">Top Languages</p>
                        <div className="flex h-4 rounded-full overflow-hidden">
                          {githubStats?.languages.map((lang, index) => (
                            <div 
                              key={index}
                              className={cn(
                                "h-full",
                                index === 0 ? "bg-blue-500" :
                                index === 1 ? "bg-green-500" :
                                index === 2 ? "bg-yellow-500" :
                                "bg-red-500"
                              )}
                              style={{ width: `${lang.percentage}%` }}
                              title={`${lang.name}: ${lang.percentage}%`}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-400">
                          {githubStats?.languages.map((lang, index) => (
                            <span key={index}>{lang.name} ({lang.percentage}%)</span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Commit Activity Graph */}
                      <div className="bg-[#202020] p-3 rounded-lg">
                        <p className="text-gray-400 text-xs mb-1">Commit Activity</p>
                        <div className="h-32">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={githubStats?.commitData}
                              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#aaa' }} />
                              <YAxis tick={{ fontSize: 10, fill: '#aaa' }} />
                              <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* LeetCode Stats Tab */}
                  {activeTab === 'leetcode' && (
                    <div className="space-y-4">
                      {/* Summary Stats */}
                      <div className="flex space-x-4">
                        <div className="flex-1 bg-[#202020] p-3 rounded-lg">
                          <p className="text-gray-400 text-xs">Problems Solved</p>
                          <p className="text-white text-xl font-medium">{leetcodeStats?.totalSolved}</p>
                        </div>
                        <div className="flex-1 bg-[#202020] p-3 rounded-lg">
                          <p className="text-gray-400 text-xs">Current Streak</p>
                          <p className="text-white text-xl font-medium">{leetcodeStats?.streak} days</p>
                        </div>
                      </div>
                      
                      {/* Difficulty Breakdown */}
                      <div className="bg-[#202020] p-3 rounded-lg">
                        <p className="text-gray-400 text-xs mb-3">Difficulty Breakdown</p>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-green-400">Easy</span>
                              <span className="text-gray-300">{leetcodeStats?.difficulty.easy} / {leetcodeStats?.totalSolved}</span>
                            </div>
                            <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ 
                                width: `${leetcodeStats ? (leetcodeStats.difficulty.easy / leetcodeStats.totalSolved) * 100 : 0}%` 
                              }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-yellow-400">Medium</span>
                              <span className="text-gray-300">{leetcodeStats?.difficulty.medium} / {leetcodeStats?.totalSolved}</span>
                            </div>
                            <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ 
                                width: `${leetcodeStats ? (leetcodeStats.difficulty.medium / leetcodeStats.totalSolved) * 100 : 0}%` 
                              }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-red-400">Hard</span>
                              <span className="text-gray-300">{leetcodeStats?.difficulty.hard} / {leetcodeStats?.totalSolved}</span>
                            </div>
                            <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ 
                                width: `${leetcodeStats ? (leetcodeStats.difficulty.hard / leetcodeStats.totalSolved) * 100 : 0}%` 
                              }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Problem Solving Stats */}
                      <div className="bg-[#202020] p-3 rounded-lg">
                        <p className="text-gray-400 text-xs mb-2">Recent Activity</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-green-400">✓ Two Sum</span>
                            <span className="text-gray-400 text-xs">Easy • 2d ago</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-yellow-400">✓ LRU Cache</span>
                            <span className="text-gray-400 text-xs">Medium • 3d ago</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-red-400">✗ Median of Two Sorted Arrays</span>
                            <span className="text-gray-400 text-xs">Hard • 4d ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Pinned Apps */}
          {/* <div className="px-4 pb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-[#ffffff] font-medium">Pinned</h2>
              <Link href="#" className="text-[#c4c4c4] text-xs bg-[#2a2a2a] px-3 py-1 rounded-sm flex items-center">
                All apps
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-6 gap-2">
              <AppIcon name="VS Code" iconPath="/placeholder.svg?height=40&width=40" />
              <AppIcon name="GitHub" iconPath="/placeholder.svg?height=40&width=40" />
              <AppIcon name="Terminal" iconPath="/placeholder.svg?height=40&width=40" />
              <AppIcon name="Chrome" iconPath="/placeholder.svg?height=40&width=40" />
              <AppIcon name="Edge" iconPath="/placeholder.svg?height=40&width=40" />
              <AppIcon name="Spotify" iconPath="/placeholder.svg?height=40&width=40" />
            </div>
          </div> */}

          {/* Recommended */}
          {/* <div className="px-4 pb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-[#ffffff] font-medium">Recent</h2>
              <Link href="#" className="text-[#c4c4c4] text-xs bg-[#2a2a2a] px-3 py-1 rounded-sm flex items-center">
                More
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <RecentFile title="my_resume - 2025-04-09" subtitle="Yesterday at 00:02" iconType="pdf" timestamp="" />
              <RecentFile title="Jake_s_Resume (21).pdf" subtitle="Yesterday at 23:36" iconType="pdf" timestamp="" />
              <RecentFile title="my_resume - 2025-04-04" subtitle="Yesterday at 21:44" iconType="pdf" timestamp="" />
              <RecentFile title="start.png" subtitle="Tuesday at 09:51" iconType="image" timestamp="" />
            </div>
          </div> */}

          {/* User Profile */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-900 mt-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#d9d9d9] overflow-hidden mr-3">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-[#ffffff] text-sm">Yassine Moumine</span>
            </div>
            <button className="text-[#ffffff] p-1 rounded-full hover:bg-[#2a2a2a]">
              <PowerIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}