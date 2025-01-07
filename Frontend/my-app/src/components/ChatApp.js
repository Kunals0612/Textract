import React, { useState } from 'react';
import Chat from './Chat'; // Importing the Chat component to display messages and answers
import Prompt from './Prompt'; // Importing the Prompt component to handle user input

function ChatApp({ uploadedFileName }) {
  const [chats, setChats] = useState([]); // State to store the conversation history (messages and answers)

  // Function to add a new chat message and its corresponding (placeholder) answer
  const addChat = (newMessage, newAnswer) => {
    setChats([...chats, { message: newMessage, answer: newAnswer }]); // Add the new message-answer pair to the chats array
  };

  return (
    <div className="relative h-[80vh] flex flex-col">
      {/* Chat display area */}
      <div className="flex-grow overflow-y-auto p-4">
        <Chat chats={chats} /> {/* Pass the chats array to the Chat component to display messages and answers */}
      </div>

      {/* Prompt input area */}
      <div className="fixed bottom-3 w-[95%] ml-2 lg:ml-40 lg:bottom-10 lg:w-[80%]">
        <Prompt
          setMessage={(newMessage) => {
            const newAnswer = ''; // Set an empty string as a placeholder while waiting for a response
            addChat(newMessage, newAnswer); // Add the new message with a placeholder answer to the chats array
          }}
          setAnswer={(newAnswer) => {
            // Update the answer for the last message in the chats array
            setChats((prevChats) => {
              const updatedChats = [...prevChats]; // Create a copy of the chats array
              updatedChats[updatedChats.length - 1].answer = newAnswer; // Update the answer for the last chat
              return updatedChats; // Return the updated chats array
            });
          }}
          uploadedFileName={uploadedFileName} // Pass the uploaded file name to the Prompt component
        />
      </div>
    </div>
  );
}

export default ChatApp;
