import React, { Component } from 'react';

import './login.css';

class Login extends Component {

    state = {
        login: '',
        password: '',
    }

    render() {

        const fakeLogin = 'username';
        const fakePassword = 'memphis';

        const testmdp = function() {
            console.log('test mdp', this.state.login === fakeLogin && this.state.password === fakePassword);
            this.props.onLogin(this.state.login === fakeLogin && this.state.password === fakePassword);
            // return (this.state.login === fakeLogin && this.state.password === fakePassword);
        }

        const handleLoginChange = function(e) {
            this.setState({ login: e.target.value });
        }

        const handlePwdChange = function(e) {
            this.setState({ password: e.target.value });
        }

        return (
            <div className="loginbox">
                {/* <img src="avatar.png" className="avatar" /> */}
                <h1>Login</h1>
                <form>
                    <p>Utilisateur</p>
                    <input id="login" type="text"  value={this.state.login} onChange={ handleLoginChange.bind(this) } placeholder="Enter Utilisateur" />
                    <p>Mot de passe</p>
                    <input id="password" type="password" value={this.state.password} onChange={ handlePwdChange.bind(this) }  placeholder="Entrer Mot de Passe" />
                    <input type="button" onClick={testmdp.bind(this)} name="" value="Login" />
                    <br />
                </form>
            </div>
        )
    }
}

export default Login;