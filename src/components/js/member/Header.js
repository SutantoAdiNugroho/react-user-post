import React from 'react'
import {Link, withRouter} from 'react-router-dom'

function Header(props) {
    const logOut = () => {
        localStorage.removeItem("isLogin");
        
        props.history.push("/signin");
    };
    return (
        <ul style={{display: "flex", justifyContent:"center", listStyleType:"none"}}>
        <li>
            <Link style={{margin:"0 10px"}} to="/">Home</Link>
        </li>
        <li>
            <Link style={{margin:"0 10px"}} to="/about">About</Link>
        </li>
        <li>
            <Link style={{margin:"0 10px"}} to="/contact">Contact</Link>
        </li>
        <li>
            <Link style={{margin:"0 10px"}} to="/users">Users</Link>
        </li>
        <li>
            <a style={{margin:"0 10px"}} href="/" onClick={logOut}>Logout</a>
        </li>
    </ul> 
    )
}

export default withRouter(Header);
