import React, { Component } from "react";
import { connect } from 'react-redux';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };

  checkValidity(value, rules) {
    if (!rules) {
      return true;
    }

    if (rules.required && value.trim() === "") {
      return false;
    }

    if (rules.minLength && !(value.length >= rules.minLength)) {
      return false;
    }

    if (rules.maxLength && !(value.length <= rules.maxLength)) {
      return false;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      if (!pattern.test(value)) {
        return false;
      }
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      if (!pattern.test(value)) {
        return false;
      }
    }
    return true;
  }

  inputChangedHandler = (event, inputId) => {
    const updatedForm = { ...this.state.controls };
    const updatedElement = { ...updatedForm[inputId] };
    updatedElement.value = event.target.value;
    updatedElement.valid = this.checkValidity(
      updatedElement.value,
      updatedElement.validation
    );
    updatedElement.touched = true;
    updatedForm[inputId] = updatedElement;

    let formIsValid = true;
    for (let key in updatedForm) {
      const formElement = updatedForm[key];
      if (formElement.validation && !formElement.valid) {
        formIsValid = false;
        break;
      }
    }
    this.setState({ controls    : updatedForm, formIsValid: formIsValid });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );   

  };

  switchAuthModeHandler = (event) => {
      event.preventDefault();
      this.setState(prevState => {
          return {isSignup: !prevState.isSignup};
      })
  }

  render() {
    const form = this.state.controls;
    const formElementsArray = Object.keys(form).map(key => {
      const config = form[key];
      return (
        <Input
          key={key}
          elementType={config.elementType}
          elementConfig={config.elementConfig}
          value={config.value}
          invalid={!config.valid}
          shouldValidate={config.touched && config.validation}
          changed={event => {
            this.inputChangedHandler(event, key);
          }}
        />
      );
    });

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler} >
          {formElementsArray}
          <Button buttonType="Success">SUBMIT</Button>
          <Button 
            clicked={this.switchAuthModeHandler}
            buttonType="Danger">SWITCH TO {this.state.isSignup ?  'SIGN IN' : 'SIGN UP' }</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}
export default connect(null, mapDispatchToProps)(Auth);
