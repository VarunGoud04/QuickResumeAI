// components/ResumePreview.jsx
function ResumePreview({ content }) {
  const { header, education, experience, projects, technicalSkills } = content;

  return (
    <div id="resume-pdf" className="bg-white text-black p-8 w-[800px] mx-auto">
      <h1 className="text-3xl font-bold">{header.fullName}</h1>
      <p className="text-sm text-gray-700">
        {header.headline}
      </p>
      <p className="text-xs text-gray-600 mt-1">
        {header.email} • {header.phone} • {header.location}
      </p>

      <h2 className="mt-4 font-bold border-b pb-1 text-sm">Education</h2>
      {education.map((edu, i) => (
        <div key={i} className="mt-1 text-xs">
          <div className="font-semibold">{edu.degree}</div>
          <div>{edu.institution}</div>
          <div className="text-gray-500">{edu.duration}</div>
        </div>
      ))}

      <h2 className="mt-4 font-bold border-b pb-1 text-sm">Experience</h2>
      {experience.map((exp, i) => (
        <div key={i} className="mt-1 text-xs">
          <div className="font-semibold">
            {exp.role} • {exp.company}
          </div>
          <div className="text-gray-500">{exp.duration}</div>
          <ul className="list-disc ml-4">
            {exp.bullets.map((b, bi) => (
              <li key={bi}>{b}</li>
            ))}
          </ul>
        </div>
      ))}

      <h2 className="mt-4 font-bold border-b pb-1 text-sm">Projects</h2>
      {projects.map((proj, i) => (
        <div key={i} className="mt-1 text-xs">
          <div className="font-semibold">{proj.title}</div>
          <div>{proj.description}</div>
          <div className="text-gray-500">{proj.techStack}</div>
        </div>
      ))}

      <h2 className="mt-4 font-bold border-b pb-1 text-sm">Technical Skills</h2>
      <div className="text-xs">
        <div><span className="font-semibold">Languages:</span> {technicalSkills.languages}</div>
        <div><span className="font-semibold">Frontend:</span> {technicalSkills.frontend}</div>
        <div><span className="font-semibold">Backend:</span> {technicalSkills.backend}</div>
        <div><span className="font-semibold">Databases:</span> {technicalSkills.databases}</div>
        <div><span className="font-semibold">Tools:</span> {technicalSkills.tools}</div>
        <div><span className="font-semibold">Security:</span> {technicalSkills.security}</div>
      </div>
    </div>
  );
}

export default ResumePreview;
