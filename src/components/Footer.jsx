import { GlobeAltIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-100 via-indigo-50 to-purple-50 text-center py-8 mt-auto border-t border-gray-200 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.2)_1px,transparent_0)] bg-[length:40px_40px]" />

      <div className="relative z-10">
        <p className="text-sm text-gray-800 font-semibold animate-[fadeIn_0.5s_ease-out]">
          © {year} QuickResumeAI
        </p>

        <div className="flex items-center justify-center gap-2 mt-2">
          <GlobeAltIcon className="h-4 w-4 text-indigo-600" />
          <p className="text-xs text-gray-600">
            Built and developed by{" "}
            <a
              href="https://varuntechservices.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:text-purple-600 font-medium transition-colors hover:underline underline-offset-2"
            >
              Varuntechservices
            </a>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-2">
          <EnvelopeIcon className="h-4 w-4 text-indigo-600" />
          <p className="text-xs text-gray-600">
            Have feedback or feature requests? Email{" "}
            <a
              href="mailto:varuntechworks04@gmail.com"
              className="text-indigo-600 hover:text-purple-600 font-medium transition-colors hover:underline underline-offset-2"
            >
              varuntechworks04@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
