import React , {useEffect} from 'react'
import "../AllCSS/LoadingButton.css"
import { useNavigate } from "react-router-dom";

const LoadingButton = () => {
    const navigate = useNavigate();
    let urlString = window.location.href; 
    let paramString = urlString.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    // console.log(queryString.get("token"));
    // console.log(queryString.get("email"))

    const checkToken = async() =>{
        const response =  await fetch(`http://localhost:80/admin/verifyForgotPassToken`,{
            method : "POST",
            headers :{
                "Accept":"application/json",
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                token : `${queryString.get("token").replace(/(^"|"$)/g, '')}`,
                email : `${queryString.get("email").replace(/(^"|"$)/g, '')}`
            })
        });
        const awaited_response = await response.json();
        // console.log(awaited_response);

        if(awaited_response.status === 200){
            window.sessionStorage.setItem("validToken" , true);
            window.sessionStorage.setItem("token" ,queryString.get("token"));
              window.sessionStorage.setItem("email" ,queryString.get("email"));
            navigate("/setPassword" , {replace :true});
        }
        else{
            
            navigate("/InvalidLink",{replace:true})
        }
    }
   
    useEffect(() => {
        checkToken()
    }, [])
    
    
  return (
    <div id = "body_forgotPass">
        <svg width="200" height="200" id="svg_forgotPass">
        <circle id="dot1" className="shape_forgotPass" />
        <circle id="dot2" className="shape_forgotPass" />
        <circle id="dot3" className="shape_forgotPass" />
        <circle id="dot4" className="shape_forgotPass" />
        </svg>
        <div className="control-panel_forgotPass">
        <p className="switch-label_forgotPass"> We are Verifying Your URL. Please Wait! </p>
        </div>
 
</div>
  )
}

export default LoadingButton;