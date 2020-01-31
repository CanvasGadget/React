import React, { Component } from "react";
//import Amplify from "aws-amplify";
//import aws_exports from "./aws-exports";
import SignInForm from "./SignInSignUp/signInForm";
import SignUpForm from "./SignInSignUp/signUpForm";
//import Button from "@material-ui/core/Button";
//Amplify.configure(aws_exports);

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedUp: false
    };
    this.handleSignup = this.handleSignup.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleSignup() {
    this.setState({
      signedUp: true
    });
  }

  handleSignup2() {
    this.setState({
      signedUp: false
    });
  }

  handleToggle() {
    const { signedUp } = this.state;

    this.setState({
      signedUp: !signedUp
    });
  }
  render() {
    const { signedUp } = this.state;
    return (
      <div>
        {!signedUp ? (
          <div>
            <SignUpForm handleSignup={this.handleSignup} />
            {/*      <Button
              onClick={this.handleToggle}
              size="large"
              variant="contained"
            >
              Already have an account? Sign In
            </Button> */}
          </div>
        ) : (
          <div>
            <SignInForm handleSignup2={this.handleToggle} />
          </div>
        )}
      </div>
    );
  }
}

export default Landing;
