import React, { useState,useEffect } from "react";
import AppRouter from "./Router";
import {authService} from "../myBase";

function App() {
  const [init, setInit]=useState(false);
  const [isLoggedIn, setIsLoggedIn]=useState(authService.currentUser);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);
  return(
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing"}
    </>
  )
}

export default App;
