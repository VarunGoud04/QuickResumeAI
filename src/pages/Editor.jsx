import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ResumePreview from "../components/ResumePreview";


<Helmet>
  <title>Editor | QuickResumeAI</title>
  <meta name="robots" content="noindex, nofollow" />
</Helmet>

const defaultContent = {
  header: {
    fullName: "",
    headline: "",
    location: "",
    email: "",
    phone: "",
    linkedin: "",
    github: ""
  },
  careerObjective: "",
  education: [],
  experience: [],
  projects: [],
  technicalSkills: {
    languages: "",
    frontend: "",
    backend: "",
    databases: "",
    tools: "",
    security: ""
  },
  certifications: "",
  languagesSpoken: ""
};

const defaultSections = [
  { id: "header", title: "Contact Info", type: "header", locked: true },
  { id: "careerObjective", title: "Career Objective", type: "text", contentKey: "careerObjective", locked: true },
  { id: "education", title: "Education", type: "education", contentKey: "education", locked: true },
  { id: "experience", title: "Experience", type: "experience", contentKey: "experience", locked: true },
  { id: "projects", title: "Projects", type: "projects", contentKey: "projects", locked: true },
  { id: "technicalSkills", title: "Technical Skills", type: "skills", contentKey: "technicalSkills", locked: true },
  { id: "certifications", title: "Certifications", type: "text", contentKey: "certifications", locked: true },
  { id: "languages", title: "Languages", type: "text", contentKey: "languagesSpoken", locked: true }
];

function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState("saved");
  const [activeSection, setActiveSection] = useState("header");
  const [sections, setSections] = useState(defaultSections);
  const [content, setContent] = useState(defaultContent);
  const [error, setError] = useState(null);
  const [aiEnhancing, setAiEnhancing] = useState(false); // global enhance state

  // Fetch resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/resumes/${id}`);

        setContent(prev => ({
          ...defaultContent,
          ...data.content
        }));

        if (data.sections && Array.isArray(data.sections)) {
          setSections(prev => {
            const byId = Object.fromEntries(prev.map(s => [s.id, s]));
            return data.sections.map(stored => byId[stored.id] || stored);
          });
        }
      } catch (err) {
        console.error("Error loading resume:", err);
        setError("Failed to load resume. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  // Auto-save logic
  useEffect(() => {
    if (loading || !id) return;

    const timeout = setTimeout(async () => {
      try {
        setAutoSaveStatus("saving");
        const title = content.header.fullName
          ? `${content.header.fullName} Resume`
          : "Untitled Resume";

        await API.put(`/resumes/${id}`, {
          title,
          content,
          sections
        });

        setAutoSaveStatus("saved");
      } catch (err) {
        console.error("Auto-save error:", err);
        setAutoSaveStatus("error");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [content, sections, loading, id]);

  // --- Handlers ---
  const updateHeader = useCallback((field, value) => {
    setContent(prev => ({
      ...prev,
      header: { ...prev.header, [field]: value }
    }));
  }, []);

  const updateSimple = useCallback((field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
  }, []);

  const addEducation = useCallback(() => {
    setContent(prev => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", duration: "" }]
    }));
  }, []);

  const updateEducation = useCallback((i, field, value) => {
    setContent(prev => {
      const updated = prev.education.map((edu, idx) =>
        idx === i ? { ...edu, [field]: value } : edu
      );
      return { ...prev, education: updated };
    });
  }, []);

  const removeEducation = useCallback((i) => {
    if (!window.confirm("Remove this education entry?")) return;
    setContent(prev => ({
      ...prev,
      education: prev.education.filter((_, idx) => idx !== i)
    }));
  }, []);

  const addExperience = useCallback(() => {
    setContent(prev => ({
      ...prev,
      experience: [...prev.experience, { role: "", company: "", duration: "", bullets: [] }]
    }));
  }, []);

  const updateExperience = useCallback((i, field, value) => {
    setContent(prev => {
      const updated = prev.experience.map((exp, idx) =>
        idx === i ? { ...exp, [field]: value } : exp
      );
      return { ...prev, experience: updated };
    });
  }, []);

  const addBullet = useCallback((i) => {
    setContent(prev => {
      const updated = prev.experience.map((exp, idx) =>
        idx === i ? { ...exp, bullets: [...exp.bullets, ""] } : exp
      );
      return { ...prev, experience: updated };
    });
  }, []);

  const updateBullet = useCallback((i, bi, value) => {
    setContent(prev => {
      const updated = prev.experience.map((exp, expIdx) =>
        expIdx === i
          ? { ...exp, bullets: exp.bullets.map((b, idx) => (idx === bi ? value : b)) }
          : exp
      );
      return { ...prev, experience: updated };
    });
  }, []);

  const removeBullet = useCallback((i, bi) => {
    setContent(prev => {
      const updated = prev.experience.map((exp, expIdx) =>
        expIdx === i
          ? { ...exp, bullets: exp.bullets.filter((_, idx) => idx !== bi) }
          : exp
      );
      return { ...prev, experience: updated };
    });
  }, []);

  const removeExperience = useCallback((i) => {
    if (!window.confirm("Remove this experience entry?")) return;
    setContent(prev => ({
      ...prev,
      experience: prev.experience.filter((_, idx) => idx !== i)
    }));
  }, []);

  const addProject = useCallback(() => {
    setContent(prev => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", techStack: "" }]
    }));
  }, []);

  const updateProject = useCallback((i, field, value) => {
    setContent(prev => {
      const updated = prev.projects.map((proj, idx) =>
        idx === i ? { ...proj, [field]: value } : proj
      );
      return { ...prev, projects: updated };
    });
  }, []);

  const removeProject = useCallback((i) => {
    if (!window.confirm("Remove this project?")) return;
    setContent(prev => ({
      ...prev,
      projects: prev.projects.filter((_, idx) => idx !== i)
    }));
  }, []);

  const updateSkills = useCallback((field, value) => {
    setContent(prev => ({
      ...prev,
      technicalSkills: { ...prev.technicalSkills, [field]: value }
    }));
  }, []);

  const moveSection = useCallback((id, direction) => {
    setSections(prev => {
      const index = prev.findIndex(sec => sec.id === id);
      if (index === -1) return prev;
      if (direction === "up" && index === 0) return prev;
      if (direction === "down" && index === prev.length - 1) return prev;

      const clone = [...prev];
      const [moved] = clone.splice(index, 1);
      clone.splice(direction === "up" ? index - 1 : index + 1, 0, moved);
      return clone;
    });
  }, []);

  // Add custom text section (user-defined)
  const addCustomSection = useCallback(() => {
    const title = prompt("Enter new section title (e.g., Achievements, Hobbies):");
    if (!title) return;
    const id = `custom_${Date.now()}`;
    const contentKey = id;

    setSections(prev => [
      ...prev,
      { id, title, type: "text", contentKey, locked: false }
    ]);

    setContent(prev => ({
      ...prev,
      [contentKey]: ""
    }));
  }, []);

  const handleSaveAndExit = async () => {
    try {
      setSaving(true);
      const title = content.header.fullName
        ? `${content.header.fullName} Resume`
        : "Untitled Resume";
      await API.put(`/resumes/${id}`, { title, content, sections });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleExportPDF = () => {
    if (user?.plan === "free") {
      alert("PDF export is a Pro feature. Upgrade to unlock downloads.");
      return;
    }
    alert("PDF export will be implemented soon!");
  };

  // AI enhance handler for single bullet
  const handleEnhanceBullet = async (expIndex, bulletIndex, bulletText) => {
    try {
      const { data } = await API.post("/ai/enhance-bullet", {
        bullet: bulletText
      });

      setContent(prev => {
        const updated = [...prev.experience];
        updated[expIndex].bullets[bulletIndex] = data.enhanced;
        return { ...prev, experience: updated };
      });
    } catch (err) {
      console.error("AI enhance error:", err);
      alert("AI enhancement failed. Please try again.");
    }
  };

  // Global AI enhance handler (entire resume / ATS friendly)
  const handleEnhanceResume = async () => {
    if (user?.plan === "free") {
      alert("AI resume enhancement is a Pro feature. Upgrade to use this.");
      return;
    }

    const proceed = window.confirm(
      "Enhance your entire resume to be ATS-friendly? This will rewrite your text but keep your details."
    );
    if (!proceed) return;

    try {
      setAiEnhancing(true);

      const { data } = await API.post("/ai/enhance-resume", {
        content
      });

      if (data?.content) {
        setContent(prev => ({
          ...prev,
          ...data.content
        }));
      } else {
        alert("Enhancement response invalid. Please try again later.");
      }
    } catch (err) {
      console.error("AI resume enhance error:", err);
      alert("Resume enhancement failed. Please try again.");
    } finally {
      setAiEnhancing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        Loading Resume...
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <Navbar />

      <main className="flex-grow px-3 py-4 sm:px-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-64 bg-white rounded-lg shadow p-4 space-y-3 lg:sticky lg:top-6 lg:h-fit animate-[fadeIn_0.3s_ease-out]">
            <div className="pb-2 border-b flex items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-base sm:text-lg">Editor</h3>
                <p
                  className={`text-xs font-medium ${
                    autoSaveStatus === "saved"
                      ? "text-green-600"
                      : autoSaveStatus === "saving"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {autoSaveStatus === "saving"
                    ? "● Saving..."
                    : autoSaveStatus === "saved"
                    ? "✓ All changes saved"
                    : "Auto-save error"}
                </p>
              </div>
            </div>

            <div className="space-y-1 max-h-[260px] overflow-y-auto pr-1">
              {sections.map((sec, index) => (
                <div key={sec.id} className="flex items-center group">
                  <button
                    onClick={() => setActiveSection(sec.id)}
                    className={`flex-1 text-left px-3 py-2 rounded-l text-sm sm:text-[0.9rem] transition-colors ${
                      activeSection === sec.id
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {sec.title}
                  </button>
                  <div className="flex bg-gray-50 rounded-r border-l">
                    <button
                      disabled={index === 0}
                      onClick={() => moveSection(sec.id, "up")}
                      className="w-8 h-8 flex items-center justify-center text-xs hover:text-indigo-600 disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      disabled={index === sections.length - 1}
                      onClick={() => moveSection(sec.id, "down")}
                      className="w-8 h-8 flex items-center justify-center text-xs hover:text-indigo-600 disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addCustomSection}
              className="w-full border border-dashed border-indigo-400 text-indigo-600 py-2 rounded mt-2 text-sm hover:bg-indigo-50 transition"
            >
              + Add Custom Section
            </button>

            <div className="space-y-2 pt-4 border-t mt-4">
              <button
                onClick={handleEnhanceResume}
                disabled={aiEnhancing}
                className={`w-full py-2 rounded text-sm ${
                  user?.plan === "free"
                    ? "bg-purple-200 text-purple-700 cursor-pointer"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {aiEnhancing ? "Enhancing..." : "Enhance Resume with AI"}{" "}
                {user?.plan === "free" && "(Pro)"}
              </button>

              <button
                onClick={handleExportPDF}
                className={`w-full py-2 rounded text-sm ${
                  user?.plan === "free"
                    ? "bg-gray-300 text-gray-600 cursor-pointer"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                Export as PDF {user?.plan === "free" && "(Pro)"}
              </button>

              <button
                onClick={handleSaveAndExit}
                disabled={saving}
                className="w-full bg-gray-800 text-white py-2 rounded mt-1 hover:bg-black transition text-sm"
              >
                {saving ? "Saving..." : "Save & Exit"}
              </button>
            </div>
          </div>

          {/* Editor + Preview */}
          <div className="flex-1 flex flex-col lg:flex-row gap-4">
            {/* Editor Panel */}
            <div className="flex-1 bg-white rounded-lg shadow p-4 sm:p-6 lg:p-8 min-h-[500px] sm:min-h-[600px] animate-[fadeIn_0.25s_ease-out]">
              {activeSection === "header" && (
                <div className="animate-[slideIn_0.25s_ease-out]">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-2">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {Object.keys(content.header).map(key => (
                      <div key={key}>
                        <label className="block text-xs sm:text-sm font-semibold text-gray-600 capitalize mb-1">
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          className="w-full h-11 sm:h-12 border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm sm:text-base"
                          value={content.header[key]}
                          onChange={e => updateHeader(key, e.target.value)}
                          placeholder={`Your ${key}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sections.map(sec => {
                if (activeSection !== sec.id || sec.id === "header") return null;

                return (
                  <div
                    key={sec.id}
                    className="animate-[slideIn_0.25s_ease-out]"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 border-b pb-2">
                      {sec.title}
                    </h2>

                    {sec.type === "text" && (
                      <textarea
                        className="w-full border px-3 py-3 rounded min-h-[180px] sm:min-h-[220px] focus:ring-2 focus:ring-indigo-500 outline-none text-sm sm:text-base resize-vertical"
                        value={content[sec.contentKey] || ""}
                        onChange={e => updateSimple(sec.contentKey, e.target.value)}
                        placeholder={`Write your ${sec.title.toLowerCase()} here...`}
                      />
                    )}

                    {sec.type === "education" && (
                      <div className="space-y-4">
                        {content.education.map((edu, i) => (
                          <div
                            key={i}
                            className="group border p-4 sm:p-5 rounded-lg relative hover:border-indigo-300 transition"
                          >
                            <button
                              onClick={() => removeEducation(i)}
                              className="absolute top-2 right-2 text-xs sm:text-sm text-red-400 hover:text-red-600"
                            >
                              Remove
                            </button>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              <input
                                className="border px-3 py-2 rounded text-sm sm:text-base"
                                placeholder="Degree / Course"
                                value={edu.degree}
                                onChange={e =>
                                  updateEducation(i, "degree", e.target.value)
                                }
                              />
                              <input
                                className="border px-3 py-2 rounded text-sm sm:text-base"
                                placeholder="Duration (e.g. 2020 - 2024)"
                                value={edu.duration}
                                onChange={e =>
                                  updateEducation(i, "duration", e.target.value)
                                }
                              />
                              <input
                                className="border px-3 py-2 rounded col-span-1 sm:col-span-2 text-sm sm:text-base"
                                placeholder="Institution Name"
                                value={edu.institution}
                                onChange={e =>
                                  updateEducation(i, "institution", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={addEducation}
                          className="w-full py-3 border-2 border-dashed rounded-lg text-indigo-600 font-medium text-sm sm:text-base hover:bg-indigo-50"
                        >
                          + Add Education Entry
                        </button>
                      </div>
                    )}

                    {sec.type === "experience" && (
                      <div className="space-y-5 sm:space-y-6">
                        {content.experience.map((exp, i) => (
                          <div
                            key={i}
                            className="border p-4 sm:p-5 rounded-xl bg-gray-50/50"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                              <input
                                className="font-bold border px-3 py-2 rounded text-sm sm:text-base"
                                placeholder="Job Title / Role"
                                value={exp.role}
                                onChange={e =>
                                  updateExperience(i, "role", e.target.value)
                                }
                              />
                              <input
                                className="border px-3 py-2 rounded text-sm sm:text-base"
                                placeholder="Company Name"
                                value={exp.company}
                                onChange={e =>
                                  updateExperience(i, "company", e.target.value)
                                }
                              />
                              <input
                                className="border px-3 py-2 rounded text-sm sm:text-base"
                                placeholder="Duration"
                                value={exp.duration}
                                onChange={e =>
                                  updateExperience(i, "duration", e.target.value)
                                }
                              />
                              <button
                                onClick={() => removeExperience(i)}
                                className="text-red-500 text-xs sm:text-sm text-right sm:text-right mt-1 sm:mt-0"
                              >
                                Delete Experience
                              </button>
                            </div>
                            <div className="space-y-2">
                              <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase">
                                Key Responsibilities
                              </p>
                              {exp.bullets.map((b, bi) => (
                                <div key={bi} className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-start">
                                  <div className="flex mt-1 sm:mt-2 text-gray-400">
                                    <span>•</span>
                                  </div>
                                  <textarea
                                    className="flex-1 border px-3 py-2 rounded text-sm sm:text-base"
                                    value={b}
                                    onChange={e =>
                                      updateBullet(i, bi, e.target.value)
                                    }
                                    rows={2}
                                  />
                                  <div className="flex gap-1 sm:flex-col sm:gap-2">
                                    <button
                                      onClick={() =>
                                        handleEnhanceBullet(i, bi, b)
                                      }
                                      className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-indigo-700"
                                    >
                                      AI
                                    </button>
                                    <button
                                      onClick={() => removeBullet(i, bi)}
                                      className="text-gray-300 hover:text-red-500 text-lg leading-none px-2"
                                    >
                                      ×
                                    </button>
                                  </div>
                                </div>
                              ))}
                              <button
                                onClick={() => addBullet(i)}
                                className="text-indigo-600 text-sm font-medium mt-1"
                              >
                                + Add Point
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          onClick={addExperience}
                          className="w-full py-3 border-2 border-dashed rounded-lg text-indigo-600 font-medium text-sm sm:text-base"
                        >
                          + Add Work Experience
                        </button>
                      </div>
                    )}

                    {sec.type === "projects" && (
                      <div className="space-y-4">
                        {content.projects.map((proj, i) => (
                          <div key={i} className="border p-4 sm:p-5 rounded-lg">
                            <input
                              className="w-full font-bold border-b mb-2 p-1 outline-none text-sm sm:text-base"
                              placeholder="Project Title"
                              value={proj.title}
                              onChange={e =>
                                updateProject(i, "title", e.target.value)
                              }
                            />
                            <textarea
                              className="w-full border px-3 py-2 rounded mt-2 text-sm sm:text-base"
                              placeholder="Description"
                              rows="3"
                              value={proj.description}
                              onChange={e =>
                                updateProject(i, "description", e.target.value)
                              }
                            />
                            <input
                              className="w-full border px-3 py-2 rounded mt-2 text-xs sm:text-sm bg-gray-50"
                              placeholder="Tech Stack (e.g. React, Node.js, MongoDB)"
                              value={proj.techStack}
                              onChange={e =>
                                updateProject(i, "techStack", e.target.value)
                              }
                            />
                            <button
                              onClick={() => removeProject(i)}
                              className="text-red-500 text-xs mt-2"
                            >
                              Delete Project
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addProject}
                          className="w-full py-3 border-2 border-dashed rounded-lg text-indigo-600 font-medium text-sm sm:text-base"
                        >
                          + Add Project
                        </button>
                      </div>
                    )}

                    {sec.type === "skills" && (
                      <div className="grid grid-cols-1 gap-4">
                        {Object.keys(content.technicalSkills).map(key => (
                          <div key={key} className="flex flex-col">
                            <label className="text-xs sm:text-sm font-bold text-gray-600 capitalize mb-1">
                              {key}
                            </label>
                            <input
                              className="w-full border px-3 py-2 rounded focus:border-indigo-500 outline-none text-sm sm:text-base"
                              placeholder={
                                key === "languages"
                                  ? "Java, Python, C++"
                                  : "Your tools / technologies"
                              }
                              value={content.technicalSkills[key]}
                              onChange={e =>
                                updateSkills(key, e.target.value)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Preview Panel */}
            <div className="w-full lg:w-[380px] xl:w-[420px] bg-white rounded-lg shadow p-4 sm:p-5 overflow-y-auto max-h-[80vh]">
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                Live Preview
              </h3>
              <ResumePreview content={content} sections={sections} />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-300 text-[10px] sm:text-xs py-3 text-center">
        Resume Builder • Made with React • PDF export & AI ATS enhancement coming soon
      </footer>
    </div>
  );
}

export default Editor;
