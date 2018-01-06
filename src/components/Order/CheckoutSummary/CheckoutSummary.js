import React from 'react';
import styled from 'styled-components';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = styled.div`
  text-align: center;
  width: 80%;
  margin: auto;
`;

const checkoutSummary = props => {
  return (
    <CheckoutSummary>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </CheckoutSummary>
  );
};

export default checkoutSummary;
