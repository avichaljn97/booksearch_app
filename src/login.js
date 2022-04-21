import React, { useState } from "react";
import "./style.css";
import GoogleLogin from 'react-google-login';
import axios from "axios";
import { useNavigate} from "react-router-dom";
  

function Login(){

    const navigate = useNavigate();
    const [logindata,setLogindata]=useState(
        localStorage.getItem('logindata')
        ?
        JSON.parse(localStorage.getItem('logindata'))
        :
        null
    );
    const responseGoogle = (response) => {
        console.log(response.getBasicProfile());
      }
    
    const startSession = (response) => {
        const tokenId=response.tokenId;
         axios.post("http://localhost:5000/",{tokenId})
        .then(response=>{
            const profileDetail={
                fname:response.data.userFname,
                lname:response.data.userLname,
                email:response.data.userEmailID
            };
            setLogindata(profileDetail);
            localStorage.setItem('logindata',JSON.stringify(logindata));
            navigate("/search");
        })
        .catch(error => console.log(error));
    }

    return(
        <div className="btn_conatiner">
        <GoogleLogin
        className="signin_btn"
          clientId="122632606002-5h38f93miqusn2j7bs8ob8jdm4o05bm5.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={startSession}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        </div>
    );
}



export default Login;