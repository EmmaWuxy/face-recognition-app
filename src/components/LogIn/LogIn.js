import { Component } from "react"

class LogIn extends Component{
    constructor(props){
        super(props);    
        this.state = {
            logInEmail: '',
            logInPassword: ''
        };
    }

    onEmailChange = (event) => {
        this.setState({logInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({logInPassword: event.target.value});
    }

    onSubmitLogIn = () => {
        fetch(process.env.REACT_APP_SERVER + '/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.logInEmail,
                password: this.state.logInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id){
                    this.props.updateProfile(user);
                    this.props.onRouteChange('home');
                }
                else{
                    // Display username and password incorrect
                }
            })
    }

    render(){
        const {onRouteChange} = this.props;
        return (
            <article className="br4 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
                <main className="pa4 black-80" >
                    <div className="measure">
                        <fieldset
                            id="sign_up"
                            className="ba b--transparent ph0 mh0"
                        >
                            <legend className="f2 fw8 ph0 mh0">
                                Log In
                            </legend>
                            <div className="mt3">
                                <label
                                    className="db fw6 lh-copy f6"
                                    htmlFor="email-address"
                                >
                                    Email
                                </label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label
                                    className="db fw6 lh-copy f6"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Log in"
                                onClick={this.onSubmitLogIn}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p
                                className="f6 link dim black db pointer"
                                onClick={() => onRouteChange('register')}
                            >
                                Register
                            </p>
                        </div>
                    </div>
                </main >
            </article>
        );
    }
}

export default LogIn;