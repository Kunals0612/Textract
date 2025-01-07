import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Prompt from './components/Prompt';
import Chat from './components/Chat';
import ChatApp from './components/ChatApp';
import { useState } from 'react';

function App() {
  const [uploadedFileName, setUploadedFileName] = useState("");
  
  return (
    <div className="App">
      <div>
        <Navbar setUploadedFileName={setUploadedFileName}/>
      </div>
      <div className='mt-10'>
        <ChatApp uploadedFileName={uploadedFileName}/>
      </div>
    </div>
  );
}

export default App;
