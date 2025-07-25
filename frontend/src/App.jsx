import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import Home from "./pages/Home";
import TemplatesSection from "./components/TemplatesSection";
import ResumeUpload from "./components/ResumeUpload";
import Minimalist from "./templates/Minimalist";
import Creative from "./templates/Creative";
import Elegant from "./templates/Elegant";
import { useEffect } from "react";
import axios from "axios";

const templates = [
  {
    id: 1,
    name: "Minimalist",
    description: "Clean, simple, and professional.",
    preview: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=200&q=80",
  },
  {
    id: 2,
    name: "Creative",
    description: "Vibrant and modern for creative professionals.",
    preview: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=200&q=80",
  },
  {
    id: 3,
    name: "Elegant",
    description: "Elegant layout with stylish accents.",
    preview: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=200&q=80",
  },
];

function PortfolioTemplate() {
  const { templateId, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const portfolioId = id || templateId;

  useEffect(() => {
    if (!portfolioId) return;
    setLoading(true);
    const apiURL = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/$/, "");
    axios.get(`${apiURL}/api/portfolio/${portfolioId}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Portfolio not found");
        setLoading(false);
      });
  }, [portfolioId]);

  if (loading) return <div className="text-center mt-20 text-xl text-primary-700">Loading portfolio...</div>;
  if (error) return <div className="text-center mt-20 text-xl text-red-600">{error}</div>;
  if (!data) return null;

  if (data.templateId === "1" || templateId === "1") return <Minimalist {...data} />;
  if (data.templateId === "2" || templateId === "2") return <Creative {...data} />;
  if (data.templateId === "3" || templateId === "3") return <Elegant {...data} />;
  return <div className="text-center mt-20 text-2xl text-primary-700">Template not found.</div>;
}

function AppRoutes() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/templates");
  };

  const handleTemplateSelect = (id) => {
    setSelectedTemplate(id);
    navigate("/upload");
  };

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  return (
    <Routes>
      <Route path="/" element={<Home onExplore={handleExplore} />} />
      <Route
        path="/templates"
        element={
          <TemplatesSection
            templates={templates}
            selectedTemplate={selectedTemplate}
            onSelect={handleTemplateSelect}
          />
        }
      />
      <Route
        path="/upload"
        element={
          selectedTemplate ? (
            <ResumeUpload
              onUpload={handleResumeUpload}
              resume={resume}
              disabled={!resume}
              selectedTemplate={selectedTemplate}
            />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen text-xl text-primary-700">Please select a template first.</div>
          )
        }
      />
      <Route path="/portfolio/:id" element={<PortfolioTemplate />} />
      <Route path="/portfolio/:templateId" element={<PortfolioTemplate />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex flex-col w-screen">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
