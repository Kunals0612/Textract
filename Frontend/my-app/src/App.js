import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Prompt from './components/Prompt';
import Chat from './components/Chat';
import ChatApp from './components/ChatApp';

function App() {
  return (
    <div className="App">
      <div>
        <Navbar/>
      </div>
      <div className='mt-10'>
        <ChatApp/>
      </div>
    </div>
  );
}

export default App;
