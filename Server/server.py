import sys
from pathlib import Path
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from pydantic import BaseModel
import fitz  # PyMuPDF for handling PDFs
import os
from fastapi.middleware.cors import CORSMiddleware


# Add the `llama` directory to the Python path
llama_dir = Path(__file__).resolve().parent.parent / "Llama"
sys.path.append(str(llama_dir))

# Import the function from `groq_handler.py`
from groq_handler import get_answer_from_llama

# FastAPI app instance
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins. Replace '*' with a specific domain for better security.
    allow_credentials=True,  # Allow cookies to be sent cross-origin.
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, etc.).
    allow_headers=["*"],  # Allow all headers.
)

# Temporary storage for extracted text
uploaded_pdf_text = {}

# Endpoint to handle file uploading
@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
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

        # Save the extracted text in memory (keyed by filename)
        uploaded_pdf_text[file.filename] = extracted_text

        return {"message": "File uploaded and processed successfully.", "filename": file.filename}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Model for the ask endpoint request body
class AskRequest(BaseModel):
    filename: str
    question: str


# Endpoint to handle questions
@app.post("/ask/")
async def ask_question(data: AskRequest):
    # Check if the requested file exists in memory
    if data.filename not in uploaded_pdf_text:
        raise HTTPException(status_code=400, detail="File not found or not yet uploaded.")

    try:
        # Get the extracted text
        extracted_text = uploaded_pdf_text[data.filename]

        # Call the Llama handler to get the answer
        answer = get_answer_from_llama(extracted_text, data.question)

        return {
            "question": data.question,
            "answer": answer,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
