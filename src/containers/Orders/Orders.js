import { connect } from 'react-redux';
import React, { Component } from 'react';

import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  componentDidMount = () => {
    const { token, userId } = this.props;
    this.props.onFetchOrders(token, userId);
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
  const { token, userId } = auth;
  return {
    orders,
    loading,
    token,
    userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
