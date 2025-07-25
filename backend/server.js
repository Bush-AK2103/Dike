const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory store for portfolios
const portfolios = {};

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Ensure uploads directory exists
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// POST /api/upload: Upload resume, extract data, store in memory, return unique link
app.post('/api/upload', upload.single('resume'), (req, res) => {
  const templateId = req.body.templateId;
  if (!templateId) {
    return res.status(400).json({ error: 'templateId is required' });
  }
  console.log('Received file:', req.file);
  // Call Python script to extract data
  // const { spawn } = require('child_process');
  const filePath = req.file.path;
  const { spawn } = require('child_process');
const py = spawn(process.platform === 'win32' ? 'python' : 'python3', ['extract_resume.py', filePath]);


  let extracted = '';
  py.stdout.on('data', (data) => {
    extracted += data.toString();
  });
  py.stderr.on('data', (data) => {
    console.error('Python error:', data.toString());
  });
  py.on('close', (code) => {
    console.log(`Python script exited with code ${code}`);
    // For demo, parse extracted text into fake fields
    const lines = extracted.split('\n').filter(Boolean);
    const portfolioData = {
      id: uuidv4(),
      templateId,
      name: lines[0] || 'John Doe',
      email: lines[1] || 'john.doe@email.com',
      about: lines[2] || 'A passionate developer.',
      projects: lines.slice(3, 6).map((p, i) => p || `Project ${i + 1}`),
    };
    portfolios[portfolioData.id] = portfolioData;
    res.json({
      message: 'Portfolio created',
      portfolioId: portfolioData.id,
      link: `/portfolio/${portfolioData.id}`,
      data: portfolioData,
    });
  });
});

// GET /api/portfolio/:id: Fetch portfolio data by ID
app.get('/api/portfolio/:id', (req, res) => {
  const portfolio = portfolios[req.params.id];
  if (!portfolio) {
    return res.status(404).json({ error: 'Portfolio not found' });
  }
  res.json(portfolio);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 