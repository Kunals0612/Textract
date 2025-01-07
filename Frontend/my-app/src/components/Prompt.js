import React, { useState } from 'react'

function Prompt({setMessage}) {
  const [inputValue,setInputValue] = useState("");
  const handleSubmit = () => {
    setMessage(inputValue);
    setInputValue("");
  }
  return (
    <div className='w-full flex flex-row rounded-lg bg-slate-100 border-slate-200'>
        <input type="text" className='w-full p-3 text-sm bg-transparent focus:outline-none' placeholder='Send a Message...' onChange={(e) => {setInputValue(e.target.value)}}></input>
        <img src="/arrow.png" className='w-[7vw] h-[7vw] m-2' onClick={handleSubmit}></img>
    </div>
  )
}

export default Prompt