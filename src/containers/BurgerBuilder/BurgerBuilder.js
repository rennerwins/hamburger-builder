import { connect } from 'react-redux';
import React, { Component } from 'react';

import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Wrapper from '../../hoc/Wrapper/Wrapper';

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount = () => {
    this.props.onInitIngredients();
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.setState(() => ({ purchasing: true }));
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState(() => ({ purchasing: false }));
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const { purchasing } = this.state;
    const { ingredients, totalPrice, error, isAuthenticated } = this.props;
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
            purchasable={this.updatePurchaseState(ingredients)}
            isAuth={isAuthenticated}
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

const mapStateToProps = ({ burgerBuilder, auth }) => {
  const { ingredients, totalPrice, error } = burgerBuilder;
  const { token } = auth;
  return {
    ingredients,
    totalPrice,
    error,
    isAuthenticated: token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: ingredientName => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
