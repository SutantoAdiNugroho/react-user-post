import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function Header(props) {

    const logOut = () => {
        localStorage.removeItem("isLogin");
        
        props.history.push("/signin");
    };

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <AppBar position="static">
          <Tabs>
            <Tab style={{margin: "0 10px"}} label="Home" href="/"/>
            <Tab style={{margin: "0 10px"}} label="About" href="/about"/>
            <Tab style={{margin: "0 10px"}} label="Contact" href="/contact"/>
            <Tab style={{margin: "0 10px"}} label="Users" href="/users"/>
            <Tab style={{margin: "0 10px"}} label="Todo" href="/todo"/>
            <Tab style={{margin: "0 10px"}} label="Todo Mongoose" href="/todo-mongoose"/>
            <Tab style={{margin: "0 10px"}} label="Logout" onClick={logOut}/>
          </Tabs>
        </AppBar>
    )
}

export default withRouter(Header);
