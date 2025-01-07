import React, { useState } from 'react'; // Import React and useState for state management
import axios from 'axios'; // Import Axios for making HTTP requests

function Prompt({ setMessage, setAnswer, uploadedFileName }) {
  const [inputValue, setInputValue] = useState(""); // State to store the user's input value

  // Function to send the user's question to the backend
  const sendQuestion = async (inputValue) => {
    // Check if a file is uploaded
    if (!uploadedFileName) {
      alert("Please upload the file first!"); // Alert the user if no file is uploaded
      return;
    }
    try {
      // Send the user's question and filename to the backend via POST request
      const response = await axios.post("http://localhost:8000/ask/", {
        filename: uploadedFileName,
        question: inputValue,
      });

      console.log("Response: ", response.data); // Log the response for debugging
      setAnswer(response.data.answer); // Set the AI's answer using the `setAnswer` function
    } catch (error) {
      // Log any error that occurs during the request
      console.log("Error in sending message: ", error.response?.data || error.message);
    }
  };

  // Function to handle the form submission
  const handleSubmit = () => {
    sendQuestion(inputValue); // Send the user's question to the backend

    // Prevent setting the message if no file is uploaded
    if (!uploadedFileName) {
      return;
    } else {
      setMessage(inputValue); // Set the user's message using the `setMessage` function
      setInputValue(""); // Clear the input field after submission
    }
  };

  return (
    <div className="w-full flex flex-row bg-slate-100 items-center border-slate-600 border-opacity-10 border-2 rounded-lg">
      {/* Input field for user to type their question */}
      <input
        type="text"
        className="w-full p-3 text-sm bg-transparent focus:outline-none lg:p-5"
        placeholder="Send a message..."
        onChange={(e) => {
          setInputValue(e.target.value); // Update the input value state as the user types
        }}
        value={inputValue} // Bind the input value to the state
      />
      {/* Submit button in the form of an arrow image */}
      <img
        src="/arrow.png"
        className="w-[7vw] h-[7vw] m-2 lg:h-[1.5vw] lg:w-[1.5vw]"
        onClick={handleSubmit} // Call `handleSubmit` when the arrow is clicked
        alt="Send"
      />
    </div>
  );
}

export default Prompt;
