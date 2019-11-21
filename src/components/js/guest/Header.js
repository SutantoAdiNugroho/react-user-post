import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {
    return (
        <ul style={{display: "flex", justifyContent:"center", listStyleType:"none"}}>
            <li>
                <Link style={{margin: "0 10px"}} to="/">Home</Link>
            </li>
            <li>
                <Link style={{margin: "0 10px"}} to="/about">About</Link>
            </li>
            <li>
                <Link style={{margin: "0 10px"}} to="/contact">Contact</Link>
            </li>
            <li>
            <Link style={{margin: "0 10px"}} to="/signin">Sign In</Link>
        </li>
        <li>
            <Link style={{margin: "0 10px"}} to="/signup">Sign Up</Link>
        </li>
        </ul> 
    )
}
