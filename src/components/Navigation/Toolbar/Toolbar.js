import React from 'react';
import styled from 'styled-components';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = styled.header`
  height: 56px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #703b09;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 90;
`;

const NavWrapper = styled.nav`
  height: 100%;

  @media (max-width: 499px) {
    display: none;
  }
`;

const toolbar = props => (
  <Toolbar>
    <div>MENU</div>
    <div style={{ height: '80%' }}>
      <Logo />
    </div>
    <NavWrapper>
      <NavigationItems />
    </NavWrapper>
  </Toolbar>
);

export default toolbar;
