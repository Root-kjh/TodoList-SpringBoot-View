import React from 'react';
import './Resources/css/App.css';
import {BeforeLogin} from './Templates';
import {AfterLogin} from './Templates';
import { useSelector } from 'react-redux';

function App() {
  const jwt = useSelector(state => state.jwt, []);
  return (
    <div className="App">
      { jwt==="null"? <AfterLogin/> : <BeforeLogin/>}
    </div>
  );
}

export default App;
