import React,{useState}from 'react'
import Chat from './Chat';
import Prompt from './Prompt';

function ChatApp() {
  const [message,setMessage] = useState("");    
  return (
    <div>
        <div>
            <Chat message={message}/>
        </div>
        <div className='absolute bottom-3 w-[95%] ml-2'>
            <Prompt setMessage={setMessage}/>
        </div>
    </div>
  )
}

export default ChatApp