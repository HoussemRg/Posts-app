import {Link} from 'react-router-dom'
import {auth} from '../config/firebase'
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from "firebase/auth"
import {useNavigate} from 'react-router-dom'
import './navbar.css'
export const Navbar =() => {
    const [user] = useAuthState(auth);
    const navigate=useNavigate();
    const signUserOut= async() => {
        await signOut(auth);
        navigate('/');
    }
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href='#id'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiF9lxOAfooSTA6uaN3bJXDyuYqyQTfmEHwA&usqp=CAU" alt="logo" className='img'></img></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item active">
                        <Link to={'/'} className="link">Home</Link>
                    </li>
                    
                    
                    {!user ? <li className="nav-item">
                        <Link to={'/login'} className="link">Login</Link>
                    </li> :
                        <Link to={'/create-posts'} className="link post">Create Posts</Link>}
                </ul>
                
                {user && <button className="btn btn-warning" onClick={signUserOut}>Sign Out</button>}
                
            </div>
        </nav>
        
        </div>
    )
}