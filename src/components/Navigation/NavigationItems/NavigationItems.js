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
`;

const navigationItems = () => (
  <NavigationItems>
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </NavigationItems>
);

export default navigationItems;
