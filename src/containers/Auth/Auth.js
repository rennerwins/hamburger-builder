import { connect } from 'react-redux';
import React, { Component } from 'react';
import styled from 'styled-components';

import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

const AuthWrapper = styled.div`
  margin: 20px auto;
  width: 80%;
  text-align: center;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;

  @media (min-width: 600px) {
    width: 500px;
  }
`;

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (e, controlName) => {
    const { value } = e.target;
    const { controls } = this.state;

    this.setState(({ controls }) => ({
      controls: {
        ...controls,
        [controlName]: {
          ...controls[controlName],
          value,
          valid: this.checkValidity(value, controls[controlName].validation),
          touched: true
        }
      }
    }));
  };

  submitHandler = event => {
    event.preventDefault();
    const { isSignup } = this.state;
    const { email, password } = this.state.controls;

    this.props.onAuth(email.value, password.value, isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignup: !prevState.isSignup }));
  };

  render() {
    const { controls, isSignup } = this.state;
    const formElementsArray = [];

    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={e => this.inputChangedHandler(e, formElement.id)}
      />
    ));

    return (
      <AuthWrapper>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </AuthWrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  };
};

export default connect(null, mapDispatchToProps)(Auth);
