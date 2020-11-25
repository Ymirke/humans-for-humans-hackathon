import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Chat from '../Chat/Chat';
import PatientLogin from '../PatientLogin/PatientLogin';
import PatientSignUp from '../PatientSignUp/PatientSignUp';
import PsychologistLogin from '../PsychologistLogin/PsychologistLogin';
import Navbar from '../Navbar/Navbar';
import ChatPsychologist from '../Chat/ChatPsychologist';
import Dashboard from '../Dashboard/Dashboard';

const App = () => {
  const initToken = () => {
    const localToken = window.localStorage.getItem('token');
    if (localToken) {
      return localToken;
    }
    return '';
  };

  const [token, setToken] = useState(initToken);
  const [currentCase, setCurrentCase]: any = useState();

  const saveToken = (stateToken: string) => {
    window.localStorage.setItem('token', stateToken);
    setToken(stateToken);
  };

  useEffect(() => {
    if (token === '') {
      const localToken = window.localStorage.getItem('token');
      if (localToken) {
        setToken(localToken);
      }
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Navbar token={token} saveToken={saveToken} />
      <Switch>
        <Route exact path="/login/patient">
          <PatientLogin saveToken={saveToken} />
        </Route>
        <Route exact path="/signup/patient">
          <PatientSignUp saveToken={saveToken} />
        </Route>
        <Route exact path="/login/psychologist">
          <PsychologistLogin saveToken={saveToken} />
        </Route>
        <Route exact path="/chat">
          <Chat token={token} />
        </Route>
        <Route exact path="/chat/psychologist">
          <ChatPsychologist
            token={token}
            currentCase={currentCase}
            setCurrentCase={setCurrentCase}
          />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard token={token} setCurrentCase={setCurrentCase} />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
