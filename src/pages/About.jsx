

function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow pt-0"> {/* No navbar offset */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">
              Bandi Varun Goud
            </h1>
            <p className="mt-3 text-lg text-indigo-600 font-medium">
              Full Stack Developer • Creator of QuickResumeAI
            </p>
            <p className="mt-4 text-gray-600">
              Founder of Varuntechservices | MERN Stack & AI Integration Specialist
            </p>
          </div>

          {/* About Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              I am a Full Stack Developer specializing in the MERN stack,
              cloud-based systems, and AI-powered web applications. I build
              scalable, production-ready solutions focused on performance,
              usability, and long-term maintainability.
            </p>
            <p className="text-gray-700 leading-relaxed">
              I am the creator of <span className="font-semibold text-indigo-600">
                QuickResumeAI
              </span>, an AI-powered resume builder designed to generate
              ATS-optimized resumes with intelligent bullet enhancement and
              live preview capabilities.
            </p>
          </section>

          {/* QuickResumeAI Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              About QuickResumeAI
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              QuickResumeAI is a web-based AI Resume Builder built using
              React, Node.js, Express, MongoDB, and AI APIs. It allows users
              to create professional resumes with:
            </p>

            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Live resume preview</li>
              <li>Dynamic sections (Education, Experience, Projects)</li>
              <li>AI-powered bullet enhancement</li>
              <li>ATS optimization structure</li>
              <li>Cloud image uploads</li>
            </ul>
          </section>

          {/* Technical Expertise */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Technical Expertise
            </h2>

            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Frontend
                </h3>
                <p>React.js, Tailwind CSS, Vite, Responsive UI Design</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Backend
                </h3>
                <p>Node.js, Express.js, REST APIs, Authentication (JWT)</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Database
                </h3>
                <p>MongoDB, Cloud Integrations, Data Modeling</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  AI Integration
                </h3>
                <p>OpenRouter API, Resume Optimization Logic, Prompt Engineering</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Connect With Me
            </h2>

            <div className="space-y-2 text-gray-700">
              <p>
                GitHub:{" "}
                <a
                  href="https://github.com/VarunGoud04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  github.com/VarunGoud04
                </a>
              </p>

              <p>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/bandi-varun-goud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  linkedin.com/in/bandi-varun-goud
                </a>
              </p>

              <p>
                Email:{" "}
                <a
                  href="mailto:bandivarungoud05@gmail.com"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  bandivarungoud05@gmail.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>

      
    </div>
  );
}

export default About;
