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
        clientId="122632606002-5h38f93miqusn2j7bs8ob8jdm4o05bm5.apps.googleusercontent.com"
        buttonText="Logout"
        onRequest={logoutfn}
        onLogoutSuccess={logoutfn}
    >
    </GoogleLogout>
    </div>);
}

export default Logout;