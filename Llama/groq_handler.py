from groq import Groq

# Initialize Groq client
client = Groq(
    api_key="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",
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
