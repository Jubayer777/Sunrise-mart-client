import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import "./Header.css";

const Header = () => {
    const [loggedInUser, setLoggedInUser]= useContext(UserContext);
    const {name, displayName, email}=loggedInUser;
    const history=useHistory();
    const handleLogin=()=>{
        history.push('/login')
    }
    return (
        <div >
            <nav className="container pl-5 navbar navbar-expand-lg navbar-light">
                <p className='pt-2 font-weight-bold'>Sunrise Mart</p>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className='px-3 pt-2 link' to='/home'>Home</Link>
                        <Link className='px-3 pt-2 link' to='/orders'>Orders</Link>
                        <Link className='px-3 pt-2 link' to='/manageProduct'>Admin</Link>
                        <Link className='px-3 pt-2 link' to='#'>Deals</Link>
                         {
                                email ? <p className="px-3 pt-2">{name || displayName}</p> : <button type="button" id='btn-style' onClick={handleLogin} className="btn  px-3">Login</button>
                         }
                         {
                             email && <button type="button" id='btn-style' onClick={()=>setLoggedInUser({})} className="btn  px-3">Log Out</button>
                             
                         }
                        
                    </div>
                </div>
            </nav>
        </div>
    )
};

export default Header;