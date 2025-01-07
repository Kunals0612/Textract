from groq import Groq
from dotenv import load_dotenv
import os
load_dotenv()

groqkey = os.getenv("GROQ_API_KEY")

# Initialize Groq client
client = Groq(
    api_key=groqkey,
)

def get_answer_from_llama(file_content: str, question: str) -> str:
    """
    Function to interact with the Llama model.
    """
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"{file_content} Based on above text {question}",
                }
            ],
            model="llama-3.3-70b-versatile",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        raise RuntimeError(f"Error in Groq client: {e}")
