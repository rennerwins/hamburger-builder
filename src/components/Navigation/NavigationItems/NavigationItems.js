import React from 'react';
import styled from 'styled-components';

import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = styled.ul`
  margin: 0;
  padding: 0;
  list-stlye: none;
  display: flex;
  align-items: center;
  height: 100%;
  flex-flow: column;

  @media (min-width: 500px) {
    flex-flow: row;
  }
`;

const navigationItems = () => (
  <NavigationItems>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/auth">Authenticate</NavigationItem>
  </NavigationItems>
);

export default navigationItems;
