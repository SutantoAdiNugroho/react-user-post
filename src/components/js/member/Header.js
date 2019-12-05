import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function Header(props) {

    const logOut = () => {
        localStorage.removeItem("token");
        
        props.history.push("/signin");
    };

    return (
        <AppBar position="static">
          <Tabs>
            <Tab style={{margin: "0 10px"}} label="Home" href="/"/>
            <Tab style={{margin: "0 10px"}} label="Users" href="/users"/>
            <Tab style={{margin: "0 10px"}} label="Todo" href="/todo"/>
            <Tab style={{margin: "0 10px"}} label="Todo Mongoose" href="/todo-mongoose"/>
            <Tab style={{margin: "0 10px"}} label="Todo Mysql" href="/todo-mysql"/>
            <Tab style={{margin: "0 10px"}} label="Todo Sequelize" href="/todo-sequelize"/>
            <Tab style={{margin: "0 10px"}} label="Logout" onClick={logOut}/>
          </Tabs>
        </AppBar>
    )
}

export default withRouter(Header);
