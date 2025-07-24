const Elegant = ({ name = "Sophia Lee", email = "sophia.lee@email.com", about = "Elegant solutions for complex problems. Experienced in full-stack development and UI/UX design.", projects = [] }) => (
  <div className="max-w-2xl mx-auto bg-white border border-primary-200 rounded-3xl p-10 mt-10 shadow-xl">
    <h1 className="text-3xl font-serif font-bold text-primary-900 mb-1">{name}</h1>
    <p className="text-primary-700 italic mb-4">{email}</p>
    <p className="mb-8 text-gray-700 font-light">{about}</p>
    <h2 className="text-xl font-semibold text-primary-800 mb-3">Projects</h2>
    <ul className="space-y-3">
      {(projects.length ? projects : [
        { title: "E-Commerce Platform", desc: "A scalable online store with a refined user experience." },
        { title: "Design System", desc: "A reusable component library for rapid product development." },
        { title: "Blog Engine", desc: "A minimal, elegant blogging platform for writers." }
      ]).map((proj, i) => (
        typeof proj === 'string' ? (
          <li key={i}>
            <div className="font-medium text-primary-700">{proj.split(':')[0]}</div>
            <div className="text-gray-600 text-sm">{proj.split(':').slice(1).join(':').trim()}</div>
          </li>
        ) : (
          <li key={i}>
            <div className="font-medium text-primary-700">{proj.title}</div>
            <div className="text-gray-600 text-sm">{proj.desc}</div>
          </li>
        )
      ))}
    </ul>
  </div>
);

export default Elegant; 