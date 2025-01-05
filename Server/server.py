import os
from fastapi import FastAPI, File, UploadFile, HTTPException, Form
import fitz  # PyMuPDF for handling PDFs
from groq import Groq

# Initialize the Groq client
client = Groq(
    api_key="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",
)

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

        # Generate the chat completion using Groq
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"{extracted_text} Based on the above text, {question}",
                }
            ],
            model="llama-3.3-70b-versatile",
        )

        # Get the model's response
        answer = chat_completion.choices[0].message.content
        print(answer)
        return {
            "question": question,
            "answer": answer,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
