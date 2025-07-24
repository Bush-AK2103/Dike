const Minimalist = ({ name = "Jane Doe", email = "jane.doe@email.com", about = "A passionate software developer with a love for clean code and creative solutions.", projects = [] }) => (
  <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
    <h1 className="text-3xl font-bold text-primary-700 mb-2">{name}</h1>
    <p className="text-gray-500 mb-4">{email}</p>
    <p className="mb-6 text-gray-700">{about}</p>
    <h2 className="text-xl font-semibold text-primary-600 mb-2">Projects</h2>
    <ul className="list-disc pl-6 space-y-2">
      {(projects.length ? projects : [
        "Portfolio Website: A personal website to showcase my work and skills.",
        "Task Manager App: A productivity app to manage daily tasks efficiently.",
        "Weather Dashboard: A web app displaying real-time weather data for any city."
      ]).map((proj, i) => (
        <li key={i}>{proj}</li>
      ))}
    </ul>
  </div>
);

export default Minimalist; 