import React from "react";
import "./style.css";
import GoogleLogout from 'react-google-login';
import { useNavigate} from "react-router-dom";


function Logout(){
    const navigate =useNavigate();
    const logoutfn = (response) => {
        localStorage.removeItem("logindata");
        navigate("/");
    }
    return(
        <div>
    <GoogleLogout
        buttonText="Logout"
        onRequest={logoutfn}
        onLogoutSuccess={logoutfn}
    >
    </GoogleLogout>
    </div>);
}

export default Logout;
