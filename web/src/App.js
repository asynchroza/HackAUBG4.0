import { Button } from 'react-bootstrap';
import { useState } from "react";
import LandingPage from './Components/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChooseMock from './Components/ChooseMock';
import Questions from './Components/Questions';
import Graph from './Components/Graph';
import AnswerView from './Components/AnswerView';


function App() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage/>}/>
      <Route path="/typeofmock" element={<ChooseMock/>}/>
      <Route path="/mockinterview" element={<Questions/>}/>
      <Route path="/golemicici" element={<Graph/>}/>
      <Route path="/viewanswers" element={<AnswerView/>}/>
    </Routes>
    );
}

export default App;
