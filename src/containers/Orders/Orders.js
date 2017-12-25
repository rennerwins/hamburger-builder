import { connect } from 'react-redux';
import React, { Component } from 'react';

import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  componentDidMount = () => {
    this.props.onFetchOrders(this.props.token);
  };

  render() {
    const { orders, loading } = this.props;
    let order = <Spinner />;

    if (!loading) {
      order = orders.map(order => (
        <Order key={order.id} ingredients={order.ingredients} price={order.totalPrice} />
      ));
    }

    return <div>{order}</div>;
  }
}

const mapStateToProps = ({ order, auth }) => {
  const { orders, loading } = order;
  const { token } = auth;
  return {
    orders,
    loading,
    token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: token => dispatch(actions.fetchOrders(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
