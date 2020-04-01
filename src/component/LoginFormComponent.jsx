import React, {Component} from 'react';
import {FormErrors} from '../FormErrors';
import '../App.css';

class LoginFormComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
            formErrors: {login: '', password: ''},
            loginValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    handleUserInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({[name]: value},
            () => {
                this.validateField(name, value)
            })
    }

    loginHandler = () => {
        this.props.history.push(`/newses/`)
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors
        let loginValid = this.state.loginValid
        let passwordValid = this.state.passwordValid

        switch (fieldName) {
            case 'login':
                loginValid = value.match(/^[a-z]+([-_]?[a-z0-9]+){0,2}$/i)
                fieldValidationErrors.login = loginValid ? '' : ' is invalid'
                break
            case 'password':
                passwordValid = value.length >= 6
                fieldValidationErrors.password = passwordValid ? '' : ' is too short'
                break
            default:
                break
        }
        this.setState({
            formErrors: fieldValidationErrors,
            loginValid: loginValid,
            passwordValid: passwordValid
        }, this.validateForm)
    }

    validateForm() {
        this.setState({formValid: this.state.loginValid && this.state.passwordValid})
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error')

    }

    render() {
        return (
            <form className="demoForm">
                <br/>
                <br/>
                <h2>Sign up</h2>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors}/>
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.login)}`}>
                    <label htmlFor="login">Login</label>
                    <input type="text" required className="form-control" name="login"
                           placeholder="Enter your login"
                           value={this.state.login}
                           onChange={this.handleUserInput}/>
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password"
                           placeholder="Enter your password"
                           value={this.state.password}
                           onChange={this.handleUserInput}/>
                </div>
                <br/>
                <button className="btn btn-primary" disabled={!this.state.formValid}
                        onClick={this.loginHandler}>Sign in
                </button>
            </form>
        )
    }
}

export default LoginFormComponent