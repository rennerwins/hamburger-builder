import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount = async () => {
    try {
      const { data } = await axios.get('/orders.json');
      const fetchedOrders = [];
      for (let key in data) {
        fetchedOrders.push({ ...data[key], id: key });
      }
      console.log(fetchedOrders);
      await this.setState(() => ({ loading: false, orders: fetchedOrders }));
    } catch (err) {
      this.setState(() => ({ loading: false }));
    }
  };

  render() {
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);