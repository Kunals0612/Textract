import React, { useState } from 'react';
import Chat from './Chat';
import Prompt from './Prompt';

function ChatApp({ uploadedFileName }) {
  const [chats, setChats] = useState([]); // Array to store all messages and answers

  const addChat = (newMessage, newAnswer) => {
    setChats([...chats, { message: newMessage, answer: newAnswer }]);
  };

  return (
    <div className="relative h-[80vh] flex flex-col">
      {/* Chat display area */}
      <div className="flex-grow overflow-y-auto p-4">
        <Chat chats={chats} />
      </div>

      {/* Prompt input area */}
      <div className="fixed bottom-3 w-[95%] ml-2 lg:ml-40 lg:bottom-10 lg:w-[80%]">
        <Prompt
          setMessage={(newMessage) => {
            const newAnswer = ''; // Placeholder while waiting for a response
            addChat(newMessage, newAnswer);
          }}
          setAnswer={(newAnswer) => {
            // Update the answer for the last chat
            setChats((prevChats) => {
              const updatedChats = [...prevChats];
              updatedChats[updatedChats.length - 1].answer = newAnswer;
              return updatedChats;
            });
          }}
          uploadedFileName={uploadedFileName}
        />
      </div>
    </div>
  );
}

export default ChatApp;
