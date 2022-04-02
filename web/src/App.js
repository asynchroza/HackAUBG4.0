import { Button } from 'react-bootstrap';
import LandingPage from './Components/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChooseMock from './Components/ChooseMock';


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage/>}/>
      <Route path="/typeofmock" element={<ChooseMock/>}/>
    </Routes>
    );
}

export default App;
