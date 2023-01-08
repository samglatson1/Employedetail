import logo from './logo.svg';
import React,{useState,createContext} from 'react';
import './App.css';
import Login from "./user/login"
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './user/siginup';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Dashboard from './dashboard/dashboard';

export const ImageContext = createContext();

function App() {
  
  const[isLogin,setIsLogin]=useState(true)
  
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/login' element={<Login/>}  >

        </Route>
        <Route path="/" element={<Navigate replace to="/login" />} />

        <Route path='/signup' element={<Signup/>}>
        </Route>
        <Route path='/dashboard' element={<Dashboard/>}>
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
