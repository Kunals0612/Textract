import React, { use, useState } from 'react'
import axios from 'axios';
function Prompt({setMessage,setAnswer,uploadedFileName}) {
  const [inputValue,setInputValue] = useState("");
  const sendQuestion = async(inputValue) => {
     if(!uploadedFileName){
       alert("Please Upload the file First");
       return;
     }
     try{
        const response = await axios.post("http://localhost:8000/ask/",{
          filename: uploadedFileName,
          question: inputValue,
        });
        console.log("Response: ",response.data);
        setAnswer(response.data.answer)
     }catch(error){
        console.log("Error in sending message: ",error.response?.data || error.message)
     }
  }
  const handleSubmit = () => {
    sendQuestion(inputValue);
    if(!uploadedFileName){
      return;
    }else{
      setMessage(inputValue);
      setInputValue("");
    }
  }
  return (
    <div className='w-full flex flex-row bg-slate-100 items-center  border-slate-600 border-opacity-10 border-2 rounded-lg'>
        <input type="text" className='w-full p-3 text-sm bg-transparent focus:outline-none lg:p-5' placeholder='Send a Message...' onChange={(e) => {setInputValue(e.target.value)}}></input>
        <img src="/arrow.png" className='w-[7vw] h-[7vw] m-2 lg:h-[1.5vw] lg:w-[1.5vw]' onClick={handleSubmit}></img>
    </div>
  )
}

export default Prompt