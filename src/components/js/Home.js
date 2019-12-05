import React, { Fragment }  from 'react'
import Login from './SignIn'

export default function Home() {
    return (
        <Fragment>
                {JSON.parse(localStorage.getItem("token")) === null ? (
                    <Login />
                ) : (
                    <div><p>Ini Adalah Home</p></div>
                )}
            </Fragment>
    )
}
