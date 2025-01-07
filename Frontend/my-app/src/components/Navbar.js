import React, { useState, useRef } from 'react';
import axios from 'axios';

function Navbar({ setUploadedFileName }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.log('Error Uploading File: ', error.response?.data || error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setUploadedFileName(file.name);
      uploadFile(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white shadow-md h-[15vw] flex items-center flex-row gap-[10vw] lg:gap-[65vw] lg:h-[5vw]">
      {/* Logo */}
      <img src="/ai.png" className="w-[25vw] m-5 lg:w-[8vw] lg:m-10" alt="Logo" />

      {/* File Upload and Preview */}
      <div className="flex flex-row items-center gap-2 relative">
        <div className="flex items-center justify-center w-[35vw] lg:w-[10vw]">
          {uploadedFile && (
            <>
              <img
                src="/file.png"
                alt="Uploaded File Icon"
                className="w-[7vw] h-[7vw] cursor-pointer lg:w-[2.5vw] lg:h-[2.5vw]"
              />
              <span className="ml-2 text-sm text-green-500 truncate lg:text-md">
                {uploadedFile.name}
              </span>
            </>
          )}
        </div>

        <button
          className="border-black border-2 rounded-lg w-[9vw] h-[9vw] flex justify-center items-center relative lg:w-[10vw] lg:h-[2.5vw]"
          onClick={triggerFileInput}
        >
          <img src="/plus.png" className="w-[5vw] lg:w-[1.5vw]" alt="Upload Icon" />
          <p className='ml-2 hidden lg:block'>Upload PDF</p>
          <input
            type="file"
            ref={fileInputRef}
            className="absolute inset-0  opacity-0 cursor-pointer w-[9vw] h-[9vw] lg:w-[10vw] lg:h-[4vw]"
            onChange={handleFileChange}
          />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
