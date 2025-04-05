"use client"

import { FileDown } from "lucide-react"

export default function ResumeApp() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <h2 className="text-xl font-semibold">My Resume</h2>

        <a
          href="/resume.pdf"
          download
          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          <FileDown size={16} className="mr-1" />
          Download PDF
        </a>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-white p-6 shadow-sm">
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-bold mb-1">Yassine Developer</h1>
            <p className="text-gray-600">Full Stack Developer</p>
            <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-600">
              <span>contact@example.com</span>
              <span>+1 (555) 123-4567</span>
              <span>github.com/username</span>
            </div>
          </header>

          <section className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-3">Summary</h2>
            <p className="text-gray-700">
              Passionate full-stack developer with 5+ years of experience building modern web applications. Specialized
              in React, Next.js, and Node.js with a strong focus on creating performant and accessible user interfaces.
              Committed to writing clean, maintainable code and staying up-to-date with the latest technologies and best
              practices.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-3">Skills</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">Frontend</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  <li>React, Next.js, Vue.js</li>
                  <li>TypeScript, JavaScript (ES6+)</li>
                  <li>TailwindCSS, SCSS, CSS-in-JS</li>
                  <li>Redux, Zustand, React Query</li>
                  <li>Responsive Design, Accessibility</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-1">Backend</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  <li>Node.js, Express, NestJS</li>
                  <li>MongoDB, PostgreSQL, MySQL</li>
                  <li>GraphQL, REST API Design</li>
                  <li>AWS, Vercel, Netlify, Docker</li>
                  <li>Authentication, Security</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-3">Experience</h2>

            <div className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium">Senior Frontend Developer</h3>
                <span className="text-sm text-gray-600">2021 - Present</span>
              </div>
              <h4 className="text-gray-700 mb-1">Tech Innovations Inc.</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                <li>Led the frontend development of the company's flagship SaaS product</li>
                <li>Implemented a component library that improved development speed by 40%</li>
                <li>Reduced bundle size by 35% through code splitting and lazy loading</li>
                <li>Mentored junior developers and conducted code reviews</li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium">Full Stack Developer</h3>
                <span className="text-sm text-gray-600">2018 - 2021</span>
              </div>
              <h4 className="text-gray-700 mb-1">WebSolutions Co.</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                <li>Developed and maintained multiple client websites and web applications</li>
                <li>Created RESTful APIs and integrated third-party services</li>
                <li>Implemented CI/CD pipelines that reduced deployment time by 60%</li>
                <li>Collaborated with designers to implement pixel-perfect UIs</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium">Junior Web Developer</h3>
                <span className="text-sm text-gray-600">2016 - 2018</span>
              </div>
              <h4 className="text-gray-700 mb-1">Digital Agency XYZ</h4>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                <li>Built responsive websites for various clients using HTML, CSS, and JavaScript</li>
                <li>Assisted in the development of WordPress themes and plugins</li>
                <li>Optimized website performance and SEO</li>
              </ul>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-3">Education</h2>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-medium">Bachelor of Science in Computer Science</h3>
              <span className="text-sm text-gray-600">2012 - 2016</span>
            </div>
            <h4 className="text-gray-700">University of Technology</h4>
          </section>

          <section>
            <h2 className="text-lg font-semibold border-b pb-1 mb-3">Certifications</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>AWS Certified Developer - Associate</li>
              <li>MongoDB Certified Developer</li>
              <li>Google Professional Cloud Developer</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

