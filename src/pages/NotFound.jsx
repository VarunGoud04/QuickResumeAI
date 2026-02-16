import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  React.useEffect(() => {
    document.title = "404 - Page Not Found | QuickResumeAI";
    
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.content = 'noindex';
    
    return () => {
      document.title = 'QuickResumeAI - AI Resume Builder';
      const meta = document.querySelector('meta[name="robots"]');
      if (meta) meta.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Big Animated 404 */}
      <div className="animate-bounce mb-8">
        <div className="text-8xl md:text-9xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
          404
        </div>
      </div>

      {/* Clear Error State */}
      <div className="mb-8">
        <div className="text-7xl animate-pulse mb-6">🔍</div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-indigo-900 bg-clip-text text-transparent mb-4">
          Hmm... this page doesn't exist
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
          The resume tool you're looking for has vanished into the cloud! ☁️
        </p>
      </div>

      {/* Helpful Context Messages */}
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mb-12 p-6 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50">
        <div className="text-left">
          <div className="text-2xl mb-3">📝</div>
          <h3 className="font-semibold text-xl text-gray-900 mb-2">Looking for your resumes?</h3>
          <p className="text-gray-600 text-sm">Access your saved resumes, templates, and AI tools</p>
        </div>
        <div className="text-left">
          <div className="text-2xl mb-3">⚙️</div>
          <h3 className="font-semibold text-xl text-gray-900 mb-2">Need QuickResumeAI features?</h3>
          <p className="text-gray-600 text-sm">AI bullet points, ATS optimization, live preview</p>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-md w-full">
        <Link
          to="/"
          className="flex-1 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 hover:from-indigo-700"
        >
          🏠 Back to Home
        </Link>
        <Link
          to="/dashboard"
          className="flex-1 px-8 py-4 bg-white/90 border-2 border-indigo-200 text-indigo-800 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm"
        >
          📋 My Dashboard
        </Link>
      </div>

      {/* Quick Search + Help */}
      <div className="w-full max-w-lg mb-8">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/50">
          <p className="text-sm font-medium text-gray-700 mb-4 flex items-center gap-2">
            🔍 Quick search for resume tools:
          </p>
          <div className="flex bg-white rounded-xl shadow-lg overflow-hidden">
            <input
              type="text"
              placeholder="AI templates, ATS keywords, export PDF..."
              className="flex-1 px-5 py-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 transition-all duration-200 whitespace-nowrap shadow-lg">
              Find
            </button>
          </div>
        </div>
      </div>

      {/* Support Footer */}
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">
          💡 Pro tip: Use exact URLs from the navigation menu above
        </p>
        <p className="text-xs text-gray-500">
          Lost?{' '}
          <Link to="/about" className="text-indigo-600 hover:underline font-medium">
            Contact Varun
          </Link>{' '}
          or email bandivarungoud05@gmail.com
        </p>
      </div>
    </div>
  );
}

export default NotFound;
