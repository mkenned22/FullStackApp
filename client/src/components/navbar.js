import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'
import SP from "../../src/SafePassage.png"

const navStyle = {
    "background-color": "transparent",
    "border-color": "transparent"
}
const navbarbrandStyle = {
    "background-color": "transparent",
    "marginTop": "-12px",
    "float": "left"
}
const menubuttonStyle = {
    "background-color": "transparent",
    "border-color": "transparent",
    "background-image": "none",
    "box-shadow": "none"
}

const logoStyle = {
    "width": "45px",
    "height": "45px"
}

const logofontStyle = {
    "color": "white",
    "text-transform": "none"
}

const dropdowncontainerStyle = {
    "marginTop": "1px",
    "position": "relative",
    "float": "right"
}

const dropdownmenuStyle = {
    "position": "absolute",
    "top": "100%",
    "right": "0",
    "marginLeft": "-100px"
}

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                });
            }
        }).catch(error => {
            console.log('Logout error')
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);

        return (
            <header>
                <nav class="navbar navbar-default" style={navStyle}>
                    <a class="navbar-brand" style={navbarbrandStyle} href="/">
                        <span id="logo-font" style={logofontStyle}><img id="logo" style={logoStyle} src={SP} />&nbsp;&nbsp;SafePassage</span>
                    </a>
                    {loggedIn ? (
                        <div class="dropdown-container" style={dropdowncontainerStyle}>
                            <button class="btn btn-default btn-lg dropdown-toggle" style={menubuttonStyle} type="button" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                            </button>
                            <ul class="dropdown-menu" style={dropdownmenuStyle}>
                                <li>
                                    <Link to="/dashboard" className="btn btn-link">
                                        <span class="glyphicon glyphicon-blackboard" aria-hidden="true"></span>&nbsp;&nbsp;Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="btn btn-link" onClick={this.logout}>
                                        <span class="glyphicon glyphicon-thumbs-down" aria-hidden="true"></span>&nbsp;&nbsp;Log Out
                                    </Link>
                                </li>
                                <li role="separator" class="divider"></li>
                                <li>
                                    <Link to="/" className="btn btn-link">
                                        <span class="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp;&nbsp;Home
                                        </Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                            <div class="dropdown-container" style={dropdowncontainerStyle}>
                                <button class="btn btn-default btn-lg dropdown-toggle" style={menubuttonStyle} type="button" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
                                </button>
                                <ul class="dropdown-menu" style={dropdownmenuStyle}>
                                    <li>
                                        <Link to="/signup" className="btn btn-link">
                                            <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span>&nbsp;&nbsp;Sign Up</Link>
                                    </li>
                                    <li>
                                        <Link to="/login" className="btn btn-link text-secondary">
                                            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>&nbsp;&nbsp;Login
                                    </Link>
                                    </li>
                                    <li role="separator" class="divider"></li>
                                    <li>
                                        <Link to="/" className="btn btn-link">
                                            <span class="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp;&nbsp;Home
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                        )}
                </nav>
            </header>
        );

    }
}

export default Navbar