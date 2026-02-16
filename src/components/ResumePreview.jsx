// src/components/ResumePreview.jsx
function ResumePreview({ content, sections }) {
  const safeContent = content || {};
  const header = safeContent.header || {};
  const education = safeContent.education || [];
  const experience = safeContent.experience || [];
  const projects = safeContent.projects || [];
  const skills = safeContent.technicalSkills || {};

  const getSectionData = (sec) => {
    if (!sec.contentKey) return safeContent[sec.id];
    return safeContent[sec.contentKey];
  };

  return (
    <div className="text-gray-900 text-xs sm:text-sm leading-relaxed">
      {/* CONTACT INFO / HEADER */}
      <section className="mb-4">
        <h2 className="text-sm sm:text-base font-semibold mb-1">
          Contact Information
        </h2>
        <h1 className="text-xl sm:text-2xl font-bold">
          {header.fullName || "Your Name"}
        </h1>
        {header.headline && (
          <p className="text-gray-600 mt-1 text-xs sm:text-sm">
            {header.headline}
          </p>
        )}
        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
          {[header.location, header.email, header.phone, header.linkedin, header.github]
            .filter(Boolean)
            .join(" | ")}
        </p>
        <hr className="mt-3" />
      </section>

      {/* OTHER SECTIONS IN ORDER */}
      {sections
        .filter((sec) => sec.id !== "header")
        .map((sec) => {
          const data = getSectionData(sec);

          if (
            !data ||
            (Array.isArray(data) && data.length === 0) ||
            (typeof data === "object" &&
              !Array.isArray(data) &&
              Object.values(data).every((v) => !v))
          ) {
            return null;
          }

          return (
            <section key={sec.id} className="mb-4">
              {sec.title && (
                <h2 className="text-sm sm:text-base font-semibold mb-1 border-b border-gray-300 pb-1">
                  {sec.title}
                </h2>
              )}

              {/* Simple text sections: Career Objective, Certifications, Languages, custom */}
              {sec.type === "text" && typeof data === "string" && (
                <p className="mt-1 whitespace-pre-line">{data}</p>
              )}

              {/* Education */}
              {sec.type === "education" &&
                Array.isArray(education) &&
                education.map((edu, i) => (
                  <div key={i} className="mb-1">
                    {(edu.degree || edu.institution) && (
                      <p className="font-semibold">
                        {edu.degree}
                        {edu.institution && ` • ${edu.institution}`}
                      </p>
                    )}
                    {edu.duration && (
                      <p className="text-[11px] text-gray-500">
                        {edu.duration}
                      </p>
                    )}
                  </div>
                ))}

              {/* Experience */}
              {sec.type === "experience" &&
                Array.isArray(experience) &&
                experience.map((exp, i) => (
                  <div key={i} className="mb-2">
                    <p className="font-semibold">
                      {exp.role} {exp.company && <>at {exp.company}</>}
                    </p>
                    {exp.duration && (
                      <p className="text-[11px] text-gray-500">
                        {exp.duration}
                      </p>
                    )}
                    {Array.isArray(exp.bullets) && exp.bullets.length > 0 && (
                      <ul className="list-disc list-inside mt-1">
                        {exp.bullets.map((b, bi) => (
                          <li key={bi}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

              {/* Projects */}
              {sec.type === "projects" &&
                Array.isArray(projects) &&
                projects.map((proj, i) => (
                  <div key={i} className="mb-2">
                    {proj.title && (
                      <p className="font-semibold">{proj.title}</p>
                    )}
                    {proj.description && (
                      <p className="mt-0.5">{proj.description}</p>
                    )}
                    {proj.techStack && (
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Tech: {proj.techStack}
                      </p>
                    )}
                  </div>
                ))}

              {/* Technical Skills */}
              {sec.type === "skills" &&
                skills &&
                Object.entries(skills).map(
                  ([key, value]) =>
                    value && (
                      <p key={key} className="mt-0.5">
                        <strong>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </strong>{" "}
                        {value}
                      </p>
                    )
                )}
            </section>
          );
        })}
    </div>
  );
}

export default ResumePreview;
