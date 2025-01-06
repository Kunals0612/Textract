import React, { useState } from 'react'

function Prompt() {
  const [message,setMessage] = useState("");
  const displayMessage = () => {
      console.log(message);
  }
  return (
    <div className='w-full flex flex-row rounded-lg bg-slate-100 border-slate-200'>
        <input type="text" className='w-full p-3 text-sm bg-transparent focus:outline-none' placeholder='Send a Message...' onChange={(e) => {setMessage(e.target.value)}}></input>
        <img src="/arrow.png" className='w-[7vw] h-[7vw] m-2' onClick={displayMessage}></img>
    </div>
  )
}

export default Prompt