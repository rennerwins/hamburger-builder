import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../../../components/UI/Button/Button';

const ContactDataWrapper = styled.div`
  margin: 20px auto;
  width: 80%;
  text-align: center;

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
    }
  };

  render() {
    return (
      <ContactDataWrapper>
        <h4>Enter your Contact Data</h4>
        <form>
          <input style={{ display: 'block' }} type="text" name="name" placeholder="Your Name" />
          <input style={{ display: 'block' }} type="email" name="email" placeholder="Your Email" />
          <input style={{ display: 'block' }} type="text" name="street" placeholder="Street" />
          <input style={{ display: 'block' }} type="text" name="postal" placeholder="Postal Code" />
          <Button btnType="Success">ORDER</Button>
        </form>
      </ContactDataWrapper>
    );
  }
}

export default ContactData;
