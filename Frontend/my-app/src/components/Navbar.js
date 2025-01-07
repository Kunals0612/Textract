import React, { useState, useRef } from 'react'; // Import React, useState for state management, and useRef for referencing the file input
import axios from 'axios'; // Import Axios for handling HTTP requests

function Navbar({ setUploadedFileName }) {
  const [uploadedFile, setUploadedFile] = useState(null); // State to store the uploaded file
  const fileInputRef = useRef(null); // Ref for the hidden file input element

  // Function to upload the file to the backend
  const uploadFile = async (file) => {
    const formData = new FormData(); // Create a FormData object for file upload
    formData.append('file', file); // Append the file to the FormData object

    try {
      // Send the file to the backend using Axios
      const response = await axios.post('http://localhost:8000/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the appropriate header for file uploads
        },
      });
      console.log('Response:', response.data); // Log the server response for debugging
    } catch (error) {
      // Handle any errors during the file upload process
      console.log('Error Uploading File: ', error.response?.data || error.message);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    // Check if the file is a PDF
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file); // Update the state with the selected file
      setUploadedFileName(file.name); // Update the parent component with the file name
      uploadFile(file); // Call the function to upload the file
    } else {
      alert('Please upload a valid PDF file.'); // Alert the user if the file is not a PDF
    }
  };

  return (
    <div className="bg-white shadow-md h-[15vw] flex items-center flex-row gap-[10vw] lg:gap-[65vw] lg:h-[5vw]">
      {/* Logo Section */}
      <img src="/ai.png" className="w-[25vw] m-5 lg:w-[8vw] lg:m-10" alt="Logo" />

      {/* File Upload Section */}
      <div className="flex flex-row items-center gap-2 relative">
        <div className="flex items-center justify-center w-[35vw] lg:w-[10vw]">
          {/* Display the uploaded file details */}
          {uploadedFile && (
            <>
              <img
                src="/file.png"
                alt="Uploaded File Icon"
                className="w-[7vw] h-[7vw] cursor-pointer lg:w-[2.5vw] lg:h-[2.5vw]"
              />
              <span className="ml-2 text-sm text-green-500 truncate lg:text-md">
                {uploadedFile.name} {/* Show the name of the uploaded file */}
              </span>
            </>
          )}
        </div>

        {/* Upload Button */}
        <button
          className="border-black border-2 rounded-lg w-[9vw] h-[9vw] flex justify-center items-center relative lg:w-[10vw] lg:h-[2.5vw]"
           // Open the file input dialog on button click
        >
          <img src="/plus.png" className="w-[5vw] lg:w-[1.5vw]" alt="Upload Icon" />
          <p className="ml-2 hidden lg:block">Upload PDF</p>
          <input
            type="file" // Hidden file input
            ref={fileInputRef} // Reference to the file input
            className="absolute inset-0 opacity-0 cursor-pointer w-[9vw] h-[9vw] lg:w-[10vw] lg:h-[4vw]"
            onChange={handleFileChange} // Handle file selection
          />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
