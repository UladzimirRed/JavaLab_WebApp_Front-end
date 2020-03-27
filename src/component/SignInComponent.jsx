import React, {Component} from "react";

class SignInComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: ''
        }
    }

    handleChange (event) {
        this.setState({
            inputValue: event.target.value
        })
    }

    loginHandler = () => {
        if(this.state.inputValue.length > 4) {
            alert('enter four')
        }
        this.props.history.push(`/news/`)
    }

    render() {
        return (
                <div className="container">

                    <div>
                        <h3>Authentication</h3>
                        <form>
                            <div className="form-group">
                                <label>Login</label>
                                <input type="text" className="form-control"
                                       onChange={ (e) => this.handleChange(e)}/>
                                <small className="form-text text-muted">Enter your login</small>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control"/>
                                <small className="form-text text-muted">Enter your password</small>
                            </div>
                            <br/>
                            <button className="btn btn-success" onClick={this.loginHandler}>Sign in</button>
                        </form>
                    </div>
                </div>
        )
    }
}

export default SignInComponent