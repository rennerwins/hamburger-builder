import { Route } from 'react-router-dom';
import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  };

  componentWillMount = () => {
    const { search } = this.props.location;
    const query = new URLSearchParams(search);
    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState(() => ({ ingredients, totalPrice: price }));
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    const { path } = this.props.match;
    const { ingredients, totalPrice } = this.state;

    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${path}/contact-data`}
          render={props => <ContactData ingredients={ingredients} price={totalPrice} {...props} />}
        />
      </div>
    );
  }
}

export default Checkout;
