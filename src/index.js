import React from 'react';
import { createRoot } from 'react-dom/client';
import Login from './login';
import Books from './books';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"; 
import './style.css';

const container = document.getElementById("root");
const root = createRoot(container);

function Root(){
  const logindata=localStorage.getItem("logindata")?localStorage.getItem("logindata"):null;
  return(
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route path="/search" element={logindata?<Books />:<Login/>}></Route>
        </Routes>
      </Router>
  )
}

root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
