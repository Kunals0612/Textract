import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Prompt from './components/Prompt';

function App() {
  return (
    <div className="App">
      <div>
        <Navbar/>
      </div>
      <div className='absolute bottom-4 w-[95%] ml-3'>
        <Prompt/>
      </div>
    </div>
  );
}

export default App;
