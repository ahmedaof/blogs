import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Rotated from './Rotated';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Home />}/>
        <Route path='/rotate' exact element={<Rotated />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
