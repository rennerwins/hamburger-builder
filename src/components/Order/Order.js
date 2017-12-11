import React from 'react';
import styled from 'styled-components';

const OrderWrapper = styled.div`
  width: 80%;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 10px;
  margin: 10px auto;
  box-sizing: border-box;
`;

const styles = {
  span: {
    textTransform: 'capitalize', 
    display: 'inline-block', 
    margin: '0 8px', 
    border: '1px solid #ccc', 
    padding: '5px'
  }
}

const order = props => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({ name: ingredientName, amount: props.ingredients[ingredientName] });
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span style={styles.span} key={ig.name}>
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <OrderWrapper>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </OrderWrapper>
  );
};

export default order;
