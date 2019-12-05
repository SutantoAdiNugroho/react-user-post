import React, { Fragment } from 'react'
import MemberHeader from './member/Header'
import GuestHeader from './guest/Header'
import {withRouter} from 'react-router-dom'


function Header () {
        return (
            <Fragment>
                {JSON.parse(localStorage.getItem("token")) === null ? (
                    <GuestHeader />
                ) : (
                    <MemberHeader />
                )}
            </Fragment>
        );
}

export default withRouter(Header);
