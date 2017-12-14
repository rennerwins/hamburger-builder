import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Wrapper from '../../hoc/Wrapper/Wrapper';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  // componentDidMount = async () => {
  //   try {
  //     const { data } = await axios.get(`/ingredients.json`);
  //     await this.setState(() => ({ ingredients: data }));
  //   } catch (err) {
  //     this.setState(() => ({ error: true }));
  //   }
  // };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    this.setState(() => ({
      purchasable: sum > 0
    }));
  };

  addIngredientHandler = type => {
    const { totalPrice } = this.state;
    const { ingredients } = this.props;
    const oldCount = ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {
      ...ingredients
    };
    updatedIngredients[type] = updatedCounted;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState(() => ({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    }));
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const { totalPrice } = this.state;
    const { ingredients } = this.props;
    const oldCount = ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCounted = oldCount - 1;
    const updatedIngredients = {
      ...ingredients
    };
    updatedIngredients[type] = updatedCounted;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
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

  purchaseContinueHandler = () => {
    const { totalPrice } = this.state;
    const { ingredients } = this.props;
    const queryParams = [];
    for (let i in ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]));
    }
    queryParams.push(`price=${totalPrice}`);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render() {
    const { error, totalPrice, purchasable, loading, purchasing } = this.state;
    const { ingredients } = this.props;
    const disabledInfo = { ...ingredients };
    let orderSummary = null;

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (ingredients) {
      burger = (
        <Wrapper>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={totalPrice}
            purchasable={purchasable}
            ordered={this.purchaseHandler}
          />
        </Wrapper>
      );

      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          price={totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Wrapper>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ ingredients }) => {
  return {
    ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: ingredientName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
