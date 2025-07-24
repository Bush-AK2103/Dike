import sys
import os

# Force stdout to UTF-8 to avoid UnicodeEncodeError
import sys
sys.stdout.reconfigure(encoding='utf-8')

file_path = sys.argv[1]
text = ''

if file_path.lower().endswith('.pdf'):
    import pdfplumber
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ''

elif file_path.lower().endswith(('.doc', '.docx')):
    import docx
    doc = docx.Document(file_path)
    text = '\n'.join(para.text for para in doc.paragraphs)

else:
    print('Unsupported file type:', file_path)
    sys.exit()

# Normalize problematic ligatures and print safely
print(text.encode('utf-8', errors='replace').decode('utf-8'))
