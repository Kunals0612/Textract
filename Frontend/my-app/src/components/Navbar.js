import React, { useState, useRef } from 'react';

function Navbar() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreviewOpen, setFilePreviewOpen] = useState(false);
  const fileInputRef = useRef(null); // Reference for the file input

  // Handle file change and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file); // Set the uploaded file
      console.log("Uploaded File: ", file.name);
    }
  };

  // Toggle file preview modal
  const handleFilePreviewClick = () => {
    if (uploadedFile) {
      setFilePreviewOpen(true); // Open the preview modal if a file is uploaded
    }
  };

  // Close file preview modal
  const closeFilePreview = () => {
    setFilePreviewOpen(false); // Close the preview modal
  };

  // Trigger the file input click when the upload button is clicked
  const triggerFileInput = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  return (
    <div className="bg-white shadow-md h-[15vw] flex items-center flex-row gap-[10vw]">
      {/* Logo */}
      <img src="/ai.png" className="w-[25vw] m-5" alt="Logo" />

      {/* File Upload and Preview */}
      <div className="flex flex-row items-center gap-2 relative">
        {/* File Icon and Name (Fixed Width) */}
        <div className="flex items-center justify-center w-[35vw]">
          {uploadedFile && (
            <>
              <img
                src="/file.png" // Replace with your file icon PNG path
                alt="Uploaded File Icon"
                className="w-[7vw] h-[7vw] cursor-pointer"
                onClick={handleFilePreviewClick} // Clicking on the file icon opens the preview
              />
              <span className="ml-2 text-sm text-green-500 truncate">
                {uploadedFile.name}
              </span>
            </>
          )}
        </div>

        {/* Upload Button */}
        <button
          className="border-black border-2 rounded-lg w-[9vw] h-[9vw] flex justify-center items-center relative"
          onClick={triggerFileInput} // Trigger file input click on button click
        >
          <img src="/plus.png" className="w-[5vw]" alt="Upload Icon" />
          <input
            type="file"
            ref={fileInputRef} // Reference to trigger the click
            className="absolute inset-0 opacity-0 cursor-pointer w-[9vw] h-[9vw]" // Invisible input field
            onChange={handleFileChange} // Handle file change
          />
        </button>
      </div>

      {/* File Preview Modal */}
      {filePreviewOpen && uploadedFile && uploadedFile.type === 'application/pdf' && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-5 rounded-lg relative">
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
              onClick={closeFilePreview} // Close the preview modal
            >
              X
            </button>
            {/* PDF Preview */}
            <div>
              <h2 className="text-xl mb-4">PDF Preview</h2>
              <embed
                src={URL.createObjectURL(uploadedFile)} // Create an object URL for the uploaded PDF
                width="100%"
                height="500px"
                type="application/pdf"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
