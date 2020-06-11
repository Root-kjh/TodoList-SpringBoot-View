import React from 'react';
import './Resources/css/App.css';
import {useState} from 'react';
import {BeforeLogin} from './Templates';
import {AfterLogin} from './Templates';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="App">
      { isLogin? <AfterLogin/> : <BeforeLogin/>}
    </div>
  );
}

export default App;
