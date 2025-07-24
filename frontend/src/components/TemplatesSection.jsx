import { Link } from "react-router-dom";

const TemplatesSection = ({ templates, selectedTemplate, onSelect }) => (
  <section className="w-full flex flex-col items-center py-20 px-4 bg-white shadow-inner rounded-t-3xl min-h-[70vh]">
    <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-10">Choose Your Portfolio Template</h2>
    <div className="flex flex-wrap gap-8 justify-center mb-12">
      {templates.map((tpl) => (
        <div
          key={tpl.id}
          className={`relative bg-white rounded-2xl shadow-xl border-4 transition-all duration-200 cursor-pointer w-72 h-64 flex flex-col items-center justify-between p-4 hover:scale-105 ${selectedTemplate === tpl.id ? 'border-primary-600 ring-4 ring-primary-200' : 'border-transparent'}`}
          onClick={() => onSelect(tpl.id)}
        >
          <img src={tpl.preview} alt={tpl.name} className="rounded-xl w-full h-32 object-cover mb-4" />
          <h3 className="text-xl font-semibold text-primary-700 mb-1">{tpl.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{tpl.description}</p>
          <div className="flex gap-2 mt-2">
            <Link
              to={`/portfolio/${tpl.id}`}
              target="_blank"
              className="btn btn-secondary text-xs px-3 py-1"
              onClick={e => e.stopPropagation()}
            >
              View Template
            </Link>
            {selectedTemplate === tpl.id && (
              <span className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full shadow">Selected</span>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TemplatesSection; 