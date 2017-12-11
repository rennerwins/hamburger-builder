import React, { Component } from 'react';
import styled from 'styled-components';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = async e => {
    e.preventDefault();
    const { ingredients, price } = this.props;

    this.setState(() => ({ loading: true }));
    const order = {
      ingredients,
      price,
      customer: {
        name: 'Win Eiwwongcharoen',
        address: {
          street: 'Test 1',
          zipCode: '12345',
          country: 'USA'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    try {
      await axios.post('/orders.json', order);
      await this.setState(() => ({ loading: false }));
      await this.props.history.push('/');
    } catch (err) {
      await this.setState(() => ({ loading: false }));
    }
  };

  render() {
    const { loading } = this.state;

    let form = (
      <form>
        <Input inputType="input" type="text" name="name" placeholder="Your Name" />
        <Input inputType="input" type="email" name="email" placeholder="Your Email" />
        <Input inputType="input" type="text" name="street" placeholder="Street" />
        <Input inputType="input" type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>
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

export default ContactData;
