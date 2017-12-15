import { Route } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    const { path } = this.props.match;
    const { ingredients } = this.props;

    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={`${path}/contact-data`} component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = ({ ingredients }) => {
  return {
    ingredients
  };
};

export default connect(mapStateToProps, null)(Checkout);
