import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios';
import './Login.css';

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		

		//request to server to add a new username/password
		axios
			.post('/user/', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					axios.post('/user/login', {
						username: this.state.username,
						password: this.state.password
					})
					.then(response => {
						console.log('login response: ')
						console.log(response)
						if (response.status === 200) {
							// update App.js state
							this.props.updateUser({
								loggedIn: true,
								username: response.data.username
							})
							// update the state to redirect to home
							this.setState({
								redirectTo: '/dashboard'
							})
						}
					}).catch(error => {
						console.log('login error: ')
						console.log(error);

					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {
	if (this.state.redirectTo) {
		return <Redirect to={{ pathname: this.state.redirectTo }} />
	} else {
		return (
			<div class="container">
			<form class="form-signin" onSubmit={this.onSubmit}>
			  <h2 class="form-signin-heading">Register</h2>
			  <label for="inputEmail" class="sr-only">Email address</label>
			  <input type="email" class="form-control" placeholder="Email address" name="username" value={this.state.username} onChange={this.handleChange} required/>
			  <label for="inputPassword" class="sr-only">Password</label>
			  <input type="password" class="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} required/>
			  <button class="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleSubmit}>Register</button>
			</form>
		  </div>
		)
	}
}
	
}

export default Signup
