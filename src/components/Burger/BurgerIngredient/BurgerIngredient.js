import React from 'react';

import './BurgerIngredient.css';

const burgerIngredient = ({ type }) => {
  let ingredient = null;

  switch (type) {
    case 'bread-bottom':
      ingredient = <div className="BreadBottom" />;
      break;

    case 'bread-top':
      ingredient = (
        <div className="BreadTop">
          <div className="Seeds1" />
          <div className="Seeds2" />
        </div>
      );
      break;

    case 'meat':
      ingredient = <div className="Meat" />;
      break;

    case 'cheese':
      ingredient = <div className="Cheese" />;
      break;

    case 'bacon':
      ingredient = <div className="Bacon" />;
      break;

    case 'salad':
      ingredient = <div className="Salad" />;
      break;

    default:
      ingredient = null;
  }
};

export default burgerIngredient;
