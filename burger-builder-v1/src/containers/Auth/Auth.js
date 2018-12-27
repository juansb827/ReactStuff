import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

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

  componentDidMount() {
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }


  inputChangedHandler = (event, inputId) => {
    const updatedForm = { ...this.state.controls };
    const updatedElement = updateObject(updatedForm[inputId], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value  ,
        updatedForm[inputId].validation        
      ),
      touched: true
    });
    
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
    let formElementsArray = Object.keys(form).map(key => {
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

    if (this.props.loading) {
      formElementsArray = <Spinner />;
    }

    let errorMessage = null;
    if(this.props.error){
      errorMessage = (<p>{this.props.error.message}</p>);
    }

    let authRedirect =  null;
    if(this.props.isAuthenticated){
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
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

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger:  state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirect
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
