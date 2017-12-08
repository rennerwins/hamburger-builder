import React, { Component } from 'react';

import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Wrapper from '../../hoc/Wrapper/Wrapper';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  componentDidMount = async () => {
    try {
      const res = await axios.get(`/ingredients.json`);
      await this.setState(() => ({ ingredients: res.data }));
    } catch (err) {
      this.setState(() => ({ error: true }));
    }
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    this.setState(() => ({
      purchasable: sum > 0
    }));
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCounted;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState(() => ({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    }));
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCounted = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCounted;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState(() => ({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    }));
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState(() => ({ purchasing: true }));
  };

  purchaseCancelHandler = () => {
    this.setState(() => ({ purchasing: false }));
  };

  purchaseContinueHandler = async () => {
    // alert('You continue');
    // this.setState(() => ({ loading: true }))
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Win Eiwwongcharoen',
    //     address: {
    //       street: 'Test 1',
    //       zipCode: '12345',
    //       country: 'USA'
    //     },
    //     email: 'test@test.com'
    //   },
    //   deliveryMethod: 'fastest'
    // }
    // try {
    //   const res = await axios.post('/orders.json', order)
    //   await this.setState(() => ({ loading: false, purchasing: false }))
    // } catch (err) {
    //   await this.setState(() => ({ loading: false, purchasing: false }))
    // }
    const { ingredients } = this.state;
    const queryParams = [];
    for (let i in ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]));
    }
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Wrapper>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Wrapper>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Wrapper>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Wrapper>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
