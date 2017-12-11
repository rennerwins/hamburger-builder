import React, { Component } from 'react';
import styled from 'styled-components';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

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
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fatest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: ''
      }
    },
    loading: false
  };

  orderHandler = async e => {
    e.preventDefault();
    const { orderForm } = this.state;
    const { ingredients, price } = this.props;

    const formData = {};

    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients,
      price,
      orderData: formData
    };

    console.log(formData);

    this.setState(() => ({ loading: true }));

    try {
      await axios.post('/orders.json', order);
      await this.setState(() => ({ loading: false }));
      await this.props.history.push('/');
    } catch (err) {
      await this.setState(() => ({ loading: false }));
    }
  };

  inputChangedHandler = (e, inputIdentifier) => {
    const { value } = e.target;

    console.log(value, inputIdentifier);

    this.setState(({ orderForm }) => ({
      orderForm: {
        ...orderForm,
        [inputIdentifier]: {
          ...orderForm[inputIdentifier],
          value
        }
      }
    }));
  };

  render() {
    const { loading, orderForm } = this.state;
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
            changed={e => this.inputChangedHandler(e, formElement.id)}
          />
        ))}
        <Button btnType="Success">ORDER</Button>
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

export default ContactData;
