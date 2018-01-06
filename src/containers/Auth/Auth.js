import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import styled from 'styled-components';

import { checkValidity } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

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

  componentDidMount = () => {
    const { buildingBurger, authRedirectPath } = this.props;

    if (buildingBurger && authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  };

  inputChangedHandler = (e, controlName) => {
    const { value } = e.target;

    this.setState(({ controls }) => ({
      controls: {
        ...controls,
        [controlName]: {
          ...controls[controlName],
          value,
          valid: checkValidity(value, controls[controlName].validation),
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
    const { loading, error, isAuthenticated, authRedirectPath } = this.props;
    const formElementsArray = [];

    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
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

    if (loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (error) {
      errorMessage = <p>{error.message}</p>;
    }

    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to={authRedirectPath} />;
    }

    return (
      <AuthWrapper>
        {authRedirect}
        {errorMessage}
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

const mapStateToProps = ({ auth, burgerBuilder }) => {
  const { loading, error, token, authRedirectPath } = auth;
  const { building } = burgerBuilder;
  return {
    loading,
    error,
    isAuthenticated: token !== null,
    buildingBurger: building,
    authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
