import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

const ContactDataWrapper = styled.div`
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

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fatest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false,
    loading: false
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

  orderHandler = async e => {
    e.preventDefault();
    const { orderForm } = this.state;
    const { ingredients, totalPrice } = this.props;

    const formData = {};

    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients,
      totalPrice,
      orderData: formData
    };

    this.props.onOrderBurger(order);

    // this.setState(() => ({ loading: true }));
  };

  inputChangedHandler = (e, inputIdentifier) => {
    const { value } = e.target;
    const { orderForm } = this.state;

    let formIsValid = true;

    for (let inputIdentifiers in orderForm) {
      formIsValid = orderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState(({ orderForm }) => ({
      orderForm: {
        ...orderForm,
        [inputIdentifier]: {
          ...orderForm[inputIdentifier],
          value,
          valid: this.checkValidity(value, orderForm[inputIdentifier].validation),
          touched: true
        }
      }
    }));

    this.setState({ formIsValid });
  };

  render() {
    const { loading, orderForm, formIsValid } = this.state;
    const formElementsArray = [];

    for (let key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
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
        ))}
        <Button btnType="Success" disabled={!formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (loading) {
      form = <Spinner />;
    }

    return (
      <ContactDataWrapper>
        <h4>Enter your Contact Data</h4>
        {form}
      </ContactDataWrapper>
    );
  }
}

const mapStateToProps = ({ ingredients, totalPrice }) => {
  return {
    ingredients,
    totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  onOrderBurger: orderData => dispatch(actions.purchaseBurgerStart(orderData));
};

export default connect(mapStateToProps, null)(withErrorHandler(ContactData, axios));
