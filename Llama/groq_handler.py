from groq import Groq  # Importing the Groq library so we can interact with their API.
from dotenv import load_dotenv  # This helps us load our secret keys or environment variables from a .env file.
import os  # We'll use the os module to fetch environment variables.

# Load all the variables defined in the .env file into our code.
load_dotenv()

# Grab the Groq API key from the environment variables. 
# Think of this as unlocking the door to use the Groq services.
groqkey = os.getenv("GROQ_API_KEY")

# Now we’re setting up the Groq client. This is basically how we "talk" to the Groq API.
client = Groq(
    api_key=groqkey,  # We’re passing the API key here so the Groq service knows it’s us.
)

def get_answer_from_llama(file_content: str, question: str) -> str:
    """
    This function asks the Llama model a question based on some input text and returns its answer.
    
    Arguments:
    - file_content: The text or content we want the Llama model to base its answer on.
    - question: The actual question we’re asking.

    Returns:
    - The answer generated by the Llama model as a string.
    """
    try:
        # Send a message to the Llama model with the content and question. 
        # It’s like saying, "Hey Llama, here’s some information, and here’s my question!"
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",  # This just tells the model that this input is coming from us (the user).
                    "content": f"{file_content} Based on above text {question}",  # Here's the text we give the model and the question we want answered.
                }
            ],
            model="llama-3.3-70b-versatile",  # We’re specifying which version of the Llama model to use.
        )
        # The model will return a response, and we’ll grab the actual answer from it.
        return chat_completion.choices[0].message.content
    except Exception as e:
        # If something goes wrong, we’ll print a helpful error message so we can debug the problem.
        raise RuntimeError(f"Error in Groq client: {e}")
