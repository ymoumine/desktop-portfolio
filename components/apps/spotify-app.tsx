"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"

type Track = {
  id: string
  title: string
  artist: string
  album: string
  cover: string
  duration: number
}

const SAMPLE_TRACKS: Track[] = [
  {
    id: "1",
    title: "Coding Session",
    artist: "Lo-Fi Beats",
    album: "Productive Vibes",
    cover: "/icons/folder.png?height=192&width=192",
    duration: 243,
  },
  {
    id: "2",
    title: "Late Night Debugging",
    artist: "Chill Hop",
    album: "Midnight Code",
    cover: "/icons/folder.png?height=192&width=192",
    duration: 187,
  },
  {
    id: "3",
    title: "Algorithm Dance",
    artist: "Code Beats",
    album: "Binary Rhythms",
    cover: "/icons/folder.png?height=192&width=192",
    duration: 210,
  },
  {
    id: "4",
    title: "Function Harmony",
    artist: "Dev Tunes",
    album: "Clean Code",
    cover: "/icons/folder.png?height=192&width=192",
    duration: 195,
  },
  {
    id: "5",
    title: "React Hooks",
    artist: "JS Vibes",
    album: "Frontend Melodies",
    cover: "/icons/folder.png?height=192&width=192",
    duration: 224,
  },
]

export default function SpotifyApp() {
  const [tracks, setTracks] = useState<Track[]>(SAMPLE_TRACKS)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentTrack = tracks[currentTrackIndex]

  // Simulate audio playback since we don't have actual audio files
  useEffect(() => {
    setDuration(currentTrack.duration)

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [currentTrack])

  useEffect(() => {
    if (isPlaying) {
      // Simulate audio playback with progress updates
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / (currentTrack.duration * 10)

          if (newProgress >= 100) {
            playNextTrack()
            return 0
          }

          return newProgress
        })
      }, 100)
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [isPlaying, currentTrackIndex])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const playPreviousTrack = () => {
    const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length
    setCurrentTrackIndex(newIndex)
    setProgress(0)
    setDuration(tracks[newIndex].duration)
  }

  const playNextTrack = () => {
    const newIndex = (currentTrackIndex + 1) % tracks.length
    setCurrentTrackIndex(newIndex)
    setProgress(0)
    setDuration(tracks[newIndex].duration)
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = Number.parseFloat(e.target.value)
    setProgress(newProgress)

    // Simulate seeking in the track
    const newTime = (newProgress / 100) * currentTrack.duration
    // If we had a real audio element: audioRef.current.currentTime = newTime;
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)

    // If we had a real audio element: audioRef.current.volume = newVolume / 100;
  }

  // Calculate current time based on progress
  const currentTime = (progress / 100) * currentTrack.duration

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-1">My Playlist</h2>
          <p className="text-gray-400 text-sm">Coding Soundtrack</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 mb-4 rounded-md overflow-hidden shadow-lg">
              <img
                src={currentTrack.cover || "/icons/folder.png"}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold mb-1">{currentTrack.title}</h3>
              <p className="text-gray-400">{currentTrack.artist}</p>
              <p className="text-gray-500 text-sm">{currentTrack.album}</p>
            </div>

            <div className="w-full max-w-md mb-4">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(currentTrack.duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${progress}%, #4D4D4D ${progress}%, #4D4D4D 100%)`,
                }}
              />
            </div>

            <div className="flex items-center justify-center space-x-6 mb-6">
              <button className="text-gray-400 hover:text-white" onClick={playPreviousTrack}>
                <SkipBack size={24} />
              </button>

              <button
                className="bg-white text-black rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>

              <button className="text-gray-400 hover:text-white" onClick={playNextTrack}>
                <SkipForward size={24} />
              </button>
            </div>

            <div className="flex items-center w-full max-w-xs">
              <button className="text-gray-400 hover:text-white mr-2" onClick={toggleMute}>
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${volume}%, #4D4D4D ${volume}%, #4D4D4D 100%)`,
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 px-2">Up Next</h3>
          <div className="space-y-2">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                className={`flex items-center p-2 rounded-md cursor-pointer ${
                  index === currentTrackIndex ? "bg-gray-800" : "hover:bg-gray-800/50"
                }`}
                onClick={() => {
                  setCurrentTrackIndex(index)
                  setProgress(0)
                  setDuration(track.duration)
                  setIsPlaying(true)
                }}
              >
                <div className="w-10 h-10 rounded overflow-hidden mr-3">
                  <img
                    src={track.cover || "/icons/folder.png"}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{track.title}</div>
                  <div className="text-sm text-gray-400 truncate">{track.artist}</div>
                </div>

                <div className="text-xs text-gray-400 ml-2">{formatTime(track.duration)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

