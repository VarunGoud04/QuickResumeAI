import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingResume, setViewingResume] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [showWelcomeBanner, setShowWelcomeBanner] = useState(
    location.state?.justRegistered || false
  );

  useEffect(() => {
    if (location.state?.justRegistered || location.state?.justLoggedIn) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const defaultSections = [
    { id: "header", title: "", type: "header", contentKey: "header" },
    { id: "careerObjective", title: "Career Objective", type: "text", contentKey: "careerObjective" },
    { id: "education", title: "Education", type: "list", contentKey: "education" },
    { id: "experience", title: "Experience", type: "experience", contentKey: "experience" },
    { id: "projects", title: "Projects", type: "list", contentKey: "projects" },
    { id: "technicalSkills", title: "Technical Skills", type: "skills", contentKey: "technicalSkills" }
  ];

  const fetchResumes = async () => {
    try {
      const { data } = await API.get("/resumes");
      setResumes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createResume = async () => {
    if (resumes.length >= 2) {
      alert(
        "Free account is limited to only 2 resumes. Delete an existing one or upgrade to create more."
      );
      return;
    }

    try {
      const { data } = await API.post("/resumes");
      navigate(`/editor/${data._id}`);
    } catch (err) {
      console.error("Error creating resume:", err);
      alert("Failed to create resume. Please try again.");
    }
  };

  const deleteResume = async (id) => {
    try {
      await API.delete(`/resumes/${id}`);
      setResumes(resumes.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Error deleting resume:", err);
      alert("Failed to delete resume. Please try again.");
    }
  };

  const viewResume = async (id) => {
    setViewLoading(true);
    try {
      const { data } = await API.get(`/resumes/${id}`);
      setViewingResume(data);
    } catch (err) {
      console.error("Error loading resume for view:", err);
      alert("Failed to load resume. Please try again.");
    } finally {
      setViewLoading(false);
    }
  };

  const closeView = () => {
    setViewingResume(null);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const renderResumeContent = (resume) => {
    const { content } = resume;
    const sections = resume.sections || defaultSections;

    return sections.map((sec) => {
      const data = content[sec.contentKey];

      // header: always try to render (even if partially empty)
      if (sec.type !== "header") {
        if (
          !data ||
          (Array.isArray(data) && data.length === 0) ||
          (typeof data === "object" &&
            !Array.isArray(data) &&
            Object.values(data).every((v) => !v))
        ) {
          return null;
        }
      }

      return (
        <div key={sec.id} className="mb-6">
          {sec.type !== "header" && sec.title && (
            <h3 className="font-semibold text-base sm:text-lg">{sec.title}</h3>
          )}

          {sec.type === "header" && data && (
            <>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {data.fullName || "Your Name"}
              </h1>
              {data.headline && (
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  {data.headline}
                </p>
              )}
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {[
                  data.location,
                  data.email,
                  data.phone,
                  data.linkedin,
                  data.github,
                ]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
              <hr className="my-4" />
            </>
          )}

          {sec.type === "text" && (
            <p className="mt-1 text-sm sm:text-base">{data}</p>
          )}

          {/* Education list using degree/institution/duration */}
          {sec.type === "list" && sec.id === "education" &&
            Array.isArray(data) &&
            data.map((item, i) => (
              <div key={i} className="mb-2">
                {(item.degree || item.institution) && (
                  <p className="font-semibold text-sm sm:text-base">
                    {item.degree}
                    {item.institution && ` • ${item.institution}`}
                  </p>
                )}
                {item.duration && (
                  <p className="text-xs sm:text-sm text-gray-500">
                    {item.duration}
                  </p>
                )}
              </div>
            ))}

          {/* Projects list using title/description/techStack */}
          {sec.type === "list" && sec.id === "projects" &&
            Array.isArray(data) &&
            data.map((item, i) => (
              <div key={i} className="mb-2">
                {item.title && (
                  <p className="font-semibold text-sm sm:text-base">
                    {item.title}
                  </p>
                )}
                {item.description && (
                  <p className="text-sm sm:text-base">
                    {item.description}
                  </p>
                )}
                {item.techStack && (
                  <p className="text-xs sm:text-sm text-gray-500">
                    Tech: {item.techStack}
                  </p>
                )}
              </div>
            ))}

          {/* Generic list fallback (for any other list-type sections) */}
          {sec.type === "list" &&
            !["education", "projects"].includes(sec.id) &&
            Array.isArray(data) &&
            data.map((item, i) => (
              <div key={i} className="mb-2">
                {item.title && (
                  <strong className="text-sm sm:text-base">
                    {item.title}
                  </strong>
                )}
                {item.description && (
                  <p className="text-sm sm:text-base">
                    {item.description}
                  </p>
                )}
              </div>
            ))}

          {sec.type === "experience" &&
            Array.isArray(data) &&
            data.map((exp, i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold text-sm sm:text-base">
                  {exp.role} {exp.company && <>at {exp.company}</>}
                </p>
                {exp.duration && (
                  <p className="text-xs sm:text-sm text-gray-500">
                    {exp.duration}
                  </p>
                )}
                {Array.isArray(exp.bullets) && exp.bullets.length > 0 && (
                  <ul className="list-disc list-inside mt-1 text-sm sm:text-base">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

          {sec.type === "skills" &&
            data &&
            Object.entries(data).map(
              ([key, value]) =>
                value && (
                  <p key={key} className="mt-1 text-sm sm:text-base">
                    <strong>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </strong>{" "}
                    {value}
                  </p>
                )
            )}
        </div>
      );
    });
  };

  const handleDownloadPDF = async (id) => {
    try {
      alert("PDF download will be implemented soon!");
    } catch (err) {
      console.error("PDF download error:", err);
      alert("Failed to download PDF. Please try again.");
    }
  };

  const handleUpgradeAccount = () => {
    alert(
      "Pro account access will be available after using 15 days of the free account. After that, you will need to pay to continue with Pro features."
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow px-3 py-4 sm:px-4 sm:py-6">
        <div className="max-w-5xl mx-auto">
          {showWelcomeBanner && (
            <div className="mb-4 animate-[fadeIn_0.35s_ease-out]">
              <div className="bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs sm:text-sm px-3 py-2 rounded-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span>
                  Welcome to{" "}
                  <span className="font-semibold">QuickResumeAI</span>! Your
                  account is ready. Start by creating your first resume below.
                </span>
                <button
                  onClick={() => setShowWelcomeBanner(false)}
                  className="self-start sm:self-auto text-indigo-700 hover:text-indigo-900 text-xs"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">
              My Resumes
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={handleUpgradeAccount}
                className="px-3 py-2 rounded border border-purple-500 text-purple-600 text-xs sm:text-sm hover:bg-purple-50"
              >
                Upgrade Account
              </button>

              <button
                onClick={createResume}
                disabled={resumes.length >= 2}
                className={`px-4 py-2 rounded text-xs sm:text-sm text-white ${
                  resumes.length >= 2
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                + Create Resume
              </button>
            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-gray-500 mb-5 sm:mb-6">
            Free account is limited to 2 resumes. Delete one to create a new
            resume. Pro access will be available after 15 days of free usage.
          </p>

          {loading ? (
            <p className="text-sm">Loading...</p>
          ) : resumes.length === 0 ? (
            <p className="text-sm">No resumes found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {resumes.map((resume) => (
                <div
                  key={resume._id}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sm:shadow"
                >
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {resume.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    Created:{" "}
                    {new Date(resume.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex flex-wrap justify-between items-center gap-2 mt-5 text-xs sm:text-sm">
                    <button
                      onClick={() => viewResume(resume._id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleDownloadPDF(resume._id)}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      Download
                    </button>

                    <button
                      onClick={() => navigate(`/editor/${resume._id}`)}
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteResume(resume._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {viewingResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-3">
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-full sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <p className="text-[11px] sm:text-xs uppercase tracking-wide text-gray-400">
                {viewingResume.title}
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => handleDownloadPDF(viewingResume._id)}
                  className="text-xs sm:text-sm bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700"
                >
                  Download PDF
                </button>
                <button
                  onClick={closeView}
                  className="text-gray-500 hover:text-gray-700 text-lg sm:text-xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>
            {viewLoading ? (
              <p className="text-sm">Loading resume...</p>
            ) : (
              <div className="text-gray-800 text-sm sm:text-base">
                {renderResumeContent(viewingResume)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
