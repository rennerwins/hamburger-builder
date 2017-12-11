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
      const fetchedOrders = [];
      const { data } = await axios.get('/orders.json');

      for (let key in data) {
        fetchedOrders.push({ ...data[key], id: key });
      }

      await this.setState(() => ({ loading: false, orders: fetchedOrders }));
    } catch (err) {
      this.setState(() => ({ loading: false }));
    }
  };

  render() {
    const { orders } = this.state;

    return (
      <div>
        {orders.map(order => (
          <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
