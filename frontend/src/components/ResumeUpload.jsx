import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResumeUpload = ({ onUpload, resume, disabled, selectedTemplate }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !selectedTemplate) return;
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("templateId", selectedTemplate);
    try {
      console.log(import.meta.env.VITE_API_URL);
      const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const res = await axios.post(`${apiURL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } });

      const { portfolioId } = res.data;
      if (portfolioId) {
        navigate(`/portfolio/${portfolioId}`);
      } else {
        alert("Portfolio creation failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload resume.");
    }
  };

  return (
    <form className="flex flex-col items-center gap-4 w-full max-w-md" onSubmit={handleSubmit}>
      <label className="block text-lg font-medium text-primary-700">Upload Your Resume (PDF or DOCX)</label>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={onUpload}
        className="input-field"
      />
      {resume && (
        <div className="text-green-600 font-medium mt-2">{resume.name} selected</div>
      )}
      <button
        type="submit"
        className="btn btn-primary mt-4 px-8 py-3 text-lg shadow-md disabled:opacity-50"
        disabled={disabled}
      >
        Generate Portfolio
      </button>
    </form>
  );
};

export default ResumeUpload; 

// this is my resume upload section for frontend 
// does it need to be verified??