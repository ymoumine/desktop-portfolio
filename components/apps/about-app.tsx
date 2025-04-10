"use client"

import { User, Mail, MapPin, Briefcase, Calendar, Code, Heart } from "lucide-react"

export default function AboutApp() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold flex items-center">
          <User className="mr-2 text-blue-500" size={20} />
          About Me
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="bg-gray-50 rounded-lg p-4 border text-center">
              <img
                src="/icons/folder.png?height=128&width=128"
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow"
              />
              <h3 className="text-xl font-bold mb-1">Yassine Developer</h3>
              <p className="text-gray-600 mb-4">Full Stack Developer</p>

              <div className="space-y-2 text-sm text-left">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Tech Innovations Inc.</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>5+ Years Experience</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-center space-x-3">
                  <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                    <img src="/icons/folder.png?height=20&width=20" alt="GitHub" className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                    <img src="/icons/folder.png?height=20&width=20" alt="LinkedIn" className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                    <img src="/icons/folder.png?height=20&width=20" alt="Twitter" className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="bg-white rounded-lg p-6 border mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <User className="mr-2 text-blue-500" size={18} />
                Who I Am
              </h3>
              <p className="text-gray-700 mb-3">
                Hello! I'm Yassine, a passionate Full Stack Developer with over 5 years of experience building modern
                web applications. I specialize in creating intuitive, responsive, and performant user interfaces with
                React and Next.js, backed by robust Node.js APIs.
              </p>
              <p className="text-gray-700">
                I'm dedicated to writing clean, maintainable code and staying up-to-date with the latest technologies
                and best practices. I enjoy solving complex problems and turning ideas into reality through code.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Code className="mr-2 text-blue-500" size={18} />
                What I Do
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Frontend Development</h4>
                  <p className="text-sm text-gray-600">
                    Building responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Backend Development</h4>
                  <p className="text-sm text-gray-600">
                    Creating robust APIs and server-side applications with Node.js, Express, and various databases.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">UI/UX Design</h4>
                  <p className="text-sm text-gray-600">
                    Designing intuitive user experiences and translating them into beautiful interfaces.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Performance Optimization</h4>
                  <p className="text-sm text-gray-600">
                    Improving application speed and efficiency through code optimization and best practices.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Heart className="mr-2 text-blue-500" size={18} />
                What I Love
              </h3>
              <div className="space-y-3">
                <p className="text-gray-700">When I'm not coding, you can find me:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Exploring new technologies and contributing to open source</li>
                  <li>Reading tech blogs and books on software development</li>
                  <li>Hiking and enjoying the outdoors</li>
                  <li>Playing guitar and listening to music</li>
                  <li>Traveling and experiencing different cultures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

