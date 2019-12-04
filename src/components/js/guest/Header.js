import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function Header() {    

    return (
        <AppBar position="static">
          <Tabs>
            <Tab style={{margin: "0 10px"}} label="Home" href="/"/>
            {/* <Tab style={{margin: "0 10px"}} label="About" href="/about"/>
            <Tab style={{margin: "0 10px"}} label="Contact" href="/contact"/> */}
            <Tab style={{margin: "0 10px"}} label="Sign In" href="/signin"/>
            <Tab style={{margin: "0 10px"}} label="Sign Up" href="/signup"/>
          </Tabs>
        </AppBar>
    )
}
