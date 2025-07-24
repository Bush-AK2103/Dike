const Creative = ({ name = "Alex Rivera", email = "alex.rivera@email.com", about = "Creative technologist blending art and code to build engaging digital experiences. Always exploring new ideas and technologies.", projects = [] }) => (
  <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary-100 via-white to-primary-200 rounded-2xl shadow-2xl p-10 mt-10 flex flex-col items-center">
    <div className="w-32 h-32 rounded-full bg-primary-400 flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-lg">{(name[0] || "A") + (name.split(' ')[1]?.[0] || "R")}</div>
    <h1 className="text-4xl font-extrabold text-primary-700 mb-1">{name}</h1>
    <p className="text-primary-600 mb-4">{email}</p>
    <p className="mb-6 text-gray-700 text-center max-w-xl">{about}</p>
    <h2 className="text-2xl font-bold text-primary-800 mb-3 mt-6">Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {(projects.length ? projects : [
        { title: "Art Gallery VR", desc: "A virtual reality art gallery for immersive exhibitions." },
        { title: "Music Visualizer", desc: "A web app that animates music in real time with creative visuals." },
        { title: "Interactive Resume", desc: "A resume that responds to user interaction and showcases skills dynamically." },
        { title: "Code Playground", desc: "A live coding environment for experimenting with creative code snippets." }
      ]).map((proj, i) => (
        typeof proj === 'string' ? (
          <div key={i} className="bg-white rounded-xl p-4 shadow-md border-l-4 border-primary-400">
            <h3 className="font-semibold text-primary-700">{proj.split(':')[0]}</h3>
            <p className="text-gray-600">{proj.split(':').slice(1).join(':').trim()}</p>
          </div>
        ) : (
          <div key={i} className="bg-white rounded-xl p-4 shadow-md border-l-4 border-primary-400">
            <h3 className="font-semibold text-primary-700">{proj.title}</h3>
            <p className="text-gray-600">{proj.desc}</p>
          </div>
        )
      ))}
    </div>
  </div>
);

export default Creative; 