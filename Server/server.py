import sys
from pathlib import Path
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
import fitz  # PyMuPDF for handling PDFs

# Add the `llama` directory to the Python path
llama_dir = Path(__file__).resolve().parent.parent / "Llama"
sys.path.append(str(llama_dir))

# Import the function from `test.py`
from groq_handler import get_answer_from_llama

# FastAPI app instance
app = FastAPI()

@app.post("/upload/")
async def upload_and_ask(
    question: str = Form(...),  # Question from the user
    file: UploadFile = File(...),  # Uploaded file
):
    # Ensure only PDF files are uploaded
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail=f"File {file.filename} is not a valid PDF.")

    try:
        # Read PDF file bytes
        pdf_bytes = await file.read()

        # Extract text from the PDF
        with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
            extracted_text = ""
            for page_num in range(doc.page_count):
                page = doc[page_num]
                extracted_text += page.get_text("text") + "\n"

        # Call the Llama handler to get the answer
        answer = get_answer_from_llama(extracted_text, question)

        return {
            "question": question,
            "answer": answer,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
