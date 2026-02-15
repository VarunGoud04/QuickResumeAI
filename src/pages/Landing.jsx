import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  SparklesIcon,
  CheckCircleIcon,
  BoltIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_0)] bg-[length:60px_60px]" />

          <div className="relative z-10 animate-fadeIn">
            <div className="flex items-center justify-center gap-3 mb-4">
              <SparklesIcon className="h-12 w-12 text-yellow-300 animate-pulse" />
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
                QuickResumeAI
              </h1>
            </div>

            <p className="mt-4 text-xl sm:text-2xl text-white/90 max-w-3xl font-light mx-auto">
              AI-powered resume and portfolio builder designed for modern, ATS-friendly
              applications.
            </p>
            <p className="mt-3 text-sm text-white/70 max-w-2xl mx-auto">
              Create, optimize, and maintain up to 2 professional resumes for free.
              Upgrade later for advanced AI features and unlimited versions.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-yellow-400 text-indigo-900 font-bold hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <BoltIcon className="h-5 w-5 mr-2" />
                Get Started Free
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/30 text-white font-medium bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                See How It Works
              </a>
            </div>

            <p className="mt-4 text-xs text-white/60">
              No credit card required • Free plan includes AI bullet suggestions & 2 resumes
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12 animate-slideUp">
              Why use QuickResumeAI?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate-fadeIn delay-100">
                <CheckCircleIcon className="h-10 w-10 text-indigo-600 mb-4" />
                <h3 className="font-bold text-indigo-700 mb-3 text-lg">
                  ATS-Friendly Structure
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Clean sections, consistent formatting, and recruiter-ready layouts that
                  work well with applicant tracking systems.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate-fadeIn delay-200">
                <SparklesIcon className="h-10 w-10 text-purple-600 mb-4" />
                <h3 className="font-bold text-purple-700 mb-3 text-lg">
                  AI-Powered Bullet Enhancement
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Let AI rewrite your experience points into sharp, impactful bullets
                  without changing your actual achievements.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-indigo-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate-fadeIn delay-300">
                <CogIcon className="h-10 w-10 text-pink-600 mb-4" />
                <h3 className="font-bold text-pink-700 mb-3 text-lg">
                  Simple, Focused Workflow
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Edit contact info, education, experience, projects, and skills in a
                  structured editor with auto-save built in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="px-6 py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12 animate-slideUp">
              How QuickResumeAI works
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4 animate-fadeIn delay-100">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-indigo-700 mb-1">
                      Create your resume
                    </h3>
                    <p className="text-sm text-gray-600">
                      Start with a blank template and fill in your basic details, education,
                      projects, and work experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 animate-fadeIn delay-200">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-700 mb-1">
                      Enhance with AI
                    </h3>
                    <p className="text-sm text-gray-600">
                      Use AI actions on bullets or the full resume (Pro) to make content more
                      impactful and aligned with tech roles.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 animate-fadeIn delay-300">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-pink-700 mb-1">
                      Maintain up to 2 resumes for free
                    </h3>
                    <p className="text-sm text-gray-600">
                      Experiment with different profiles, then export or share once you are
                      ready to apply.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 animate-fadeIn delay-400">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-indigo-900 font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-700 mb-1">
                      Upgrade when you are ready
                    </h3>
                    <p className="text-sm text-gray-600">
                      After 15 days of exploring the free plan, unlock Pro features like
                      advanced AI optimization and future export options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white relative">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-4xl mx-auto text-center animate-fadeIn">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Start building your next resume in minutes
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Focus on your skills and experience while QuickResumeAI handles structure,
              clarity, and optimization.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-indigo-700 font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <SparklesIcon className="h-5 w-5 mr-2" />
              Get Started Free
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Landing;
