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
              <h3 className="text-xl font-bold mb-1">Yassine Moumine</h3>
              <p className="text-gray-600 mb-4">Software Developer | AI Enthusiast</p>

              <div className="space-y-2 text-sm text-left">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-500" />
                  <span>yassine.moumine@example.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Ottawa, ON, Canada</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                  <span>University of Ottawa | Kelpie Robotics</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>3+ Years Experience</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-center space-x-3">
                  <a href="https://github.com/YassineMoumine" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                    <img src="/icons/folder.png?height=20&width=20" alt="GitHub" className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/in/yassinemoumine" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                    <img src="/icons/folder.png?height=20&width=20" alt="LinkedIn" className="w-5 h-5" />
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
                Hi! I'm Yassine, a Recent Computer Engineering Grad and passionate software developer with over three years of experience. 
                I’ve worked on full-stack web apps, machine learning models, mobile apps, and embedded systems.
              </p>
              <p className="text-gray-700">
                I enjoy building meaningful applications, contributing to robotics and AI projects, and leading impactful software renovations.
                I value clean, efficient code and thrive in collaborative environments that push innovation forward.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Code className="mr-2 text-blue-500" size={18} />
                What I Do
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Full Stack Development</h4>
                  <p className="text-sm text-gray-600">
                    Building scalable and interactive applications using React.js, Next.js, Node.js, and PostgreSQL.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">AI & Machine Learning</h4>
                  <p className="text-sm text-gray-600">
                    Experimenting with deep learning models using TensorFlow and Keras for classification, image recognition, and prediction tasks.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Embedded Systems</h4>
                  <p className="text-sm text-gray-600">
                    Writing Linux-compatible sensor drivers and working with TCP/UDP sockets to log and transmit environmental data.
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Systems & Infrastructure</h4>
                  <p className="text-sm text-gray-600">
                    Proficient in Docker, Kubernetes, and CI/CD pipelines to deploy, monitor, and manage backend systems at scale.
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
                <p className="text-gray-700">Outside of code, I’m passionate about:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Working on robotics and AI-driven automation projects</li>
                  <li>Participating in hackathons and solving real-world challenges</li>
                  <li>Mentoring peers and contributing to university tech clubs</li>
                  <li>Learning about Islamic finance and ethical tech innovation</li>
                  <li>Spending time outdoors and connecting with family</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
