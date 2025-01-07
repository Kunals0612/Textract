import sys
from pathlib import Path
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from pydantic import BaseModel  # Helps define data models for request validation
import fitz  # PyMuPDF library for working with PDFs
import os
from fastapi.middleware.cors import CORSMiddleware  # For handling cross-origin requests

# Add the `Llama` directory to the Python path.
# This makes sure the program knows where to find the `groq_handler.py` file.
llama_dir = Path(__file__).resolve().parent.parent / "Llama"
sys.path.append(str(llama_dir))

# Import the function that interacts with the Llama model from `groq_handler.py`.
from groq_handler import get_answer_from_llama

# Initialize the FastAPI app
app = FastAPI()

# Configure Cross-Origin Resource Sharing (CORS) settings.
# This is important for controlling which websites can access your API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any domain. For better security, specify domains instead of '*'.
    allow_credentials=True,  # Allow cookies and authentication headers to be included in requests.
    allow_methods=["*"],  # Allow all HTTP methods (like GET, POST, PUT, etc.).
    allow_headers=["*"],  # Allow all headers in the request.
)

# Temporary dictionary to store extracted text from uploaded PDFs.
# This avoids reading the PDF repeatedly when answering questions.
uploaded_pdf_text = {}

# Endpoint to handle file uploads
@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    # Check if the uploaded file is a PDF
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail=f"File {file.filename} is not a valid PDF.")

    try:
        # Read the uploaded file as bytes
        pdf_bytes = await file.read()

        # Open and process the PDF using PyMuPDF
        with fitz.open(stream=pdf_bytes, filetype="pdf") as doc:
            extracted_text = ""
            # Loop through all the pages in the PDF and extract the text
            for page_num in range(doc.page_count):
                page = doc[page_num]
                extracted_text += page.get_text("text") + "\n"  # Extract text in plain format

        # Save the extracted text in memory, using the filename as the key
        uploaded_pdf_text[file.filename] = extracted_text

        # Return a success message with the filename
        return {"message": "File uploaded and processed successfully.", "filename": file.filename}

    except Exception as e:
        # If something goes wrong, send an error response
        raise HTTPException(status_code=500, detail=str(e))


# Define the structure of the data we expect for the /ask/ endpoint.
# This ensures that users provide both the filename and the question.
class AskRequest(BaseModel):
    filename: str  # The name of the uploaded file we want to query
    question: str  # The question to ask based on the file's content


# Endpoint to handle user questions based on the uploaded PDF
@app.post("/ask/")
async def ask_question(data: AskRequest):
    # Check if the requested file is in our temporary storage
    if data.filename not in uploaded_pdf_text:
        raise HTTPException(status_code=400, detail="File not found or not yet uploaded.")

    try:
        # Get the extracted text for the requested file
        extracted_text = uploaded_pdf_text[data.filename]

        # Use the Llama handler to process the question and get an answer
        answer = get_answer_from_llama(extracted_text, data.question)

        # Return the question and the generated answer
        return {
            "question": data.question,
            "answer": answer,
        }

    except Exception as e:
        # If something goes wrong, return an error response
        raise HTTPException(status_code=500, detail=str(e))
