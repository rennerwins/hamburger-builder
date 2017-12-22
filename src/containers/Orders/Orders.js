import { connect } from 'react-redux';
import React, { Component } from 'react';

import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount = () => {
    this.props.onFetchOrders();
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

const mapStateToProps = ({ order }) => {
  const { orders } = order;
  return {
    orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
