import { auth,provider } from "../config/firebase"
import {signInWithPopup} from "firebase/auth"
import {useNavigate} from 'react-router-dom'

export const Login =()=>{
    const navigate=useNavigate();
    const signInWithGoogle=async()=>{
        const result=await signInWithPopup(auth,provider);
        console.log(result);
        navigate('/');
    }
    
        
    
    return(
        <div style={{color:"white"}}>
            <h1>Login page</h1>
            <p>sign in with google</p>
            <button className="btn btn-primary" onClick={signInWithGoogle}>Sign In</button>
            
        </div>
    )
}