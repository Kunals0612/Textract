import React from 'react';
import ReactMarkdown from 'react-markdown'
function Chat({ chats }) {
  return (
    <div className="flex flex-col gap-10">
      {chats.map((chat, index) => (
        <div key={index} className="flex flex-col gap-[7vw] lg:gap-[3vw] lg:ml-20 lg:mr-10">
          {/* User Message */}
          {chat.message && (
            <div className="ml-5 flex flex-row">
              <div className="flex-shrink-0">
                <img src="/user.png" className="w-[10vw] h-[10vw] lg:w-[2.5vw] lg:h-[2.5vw]" alt="User" />
              </div>
              <div className="ml-3 mt-2 mr-5 lg:mt-3">
                <p>{chat.message}</p>
              </div>
            </div>
          )}

          {/* AI Answer */}
          {chat.answer === '' ? (
            // Skeleton Loader
            <div className="ml-5 flex flex-row items-start gap-4">
              <div className="flex-shrink-0">
                  <div className='animate-pulse bg-slate-400 h-[10vw] w-[10vw] rounded-full lg:w-[2.5vw] lg:h-[2.5vw]'></div>
              </div>
              <div className="flex-grow -ml-1 mt-2 mr-5 text-justify overflow-y-auto max-h-[40vh] pr-2">
                <div className="animate-pulse bg-slate-300 h-[2vh] rounded-md w-full lg:w-[50%]"></div>
              </div>
            </div>
          ) : (
            // Display Answer
            chat.answer && (
              <div className="ml-5 flex flex-row items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src="/ailogo.png"
                    className="w-[10vw] h-[10vw] object-contain lg:w-[2.5vw] lg:h-[2.5vw]"
                    alt="AI Logo"
                  />
                </div>
                <div
                  className="flex-grow -ml-1 mt-2 mr-5 text-justify overflow-y-auto max-h-[40vh] pr-2"
                > <ReactMarkdown>{chat.answer}</ReactMarkdown></div>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default Chat;
