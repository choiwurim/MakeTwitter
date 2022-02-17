import React,{useState} from "react";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Auth from "../route/Auth";
import Home from "../route/Home";
import Profile from "../route/Profile";
import Navigation from "./navigation";

const AppRouter=({isLoggedIn})=>{
    return(
        <Router>
            {isLoggedIn && <Navigation/>}
            <Routes>
            {isLoggedIn ? (
	            <>
		            <Route path="/"/>
                    <Route path="/Profile"/>
	            </>
            ):(
	            <>
                    <Route path="/" element={<Auth/>}/>
                </>
            )}
            </Routes>
        </Router>
    );
};

export default AppRouter;