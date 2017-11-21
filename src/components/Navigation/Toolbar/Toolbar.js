import React from 'react';
import styled from 'styled-components';

import Logo from '../../Logo/Logo'

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

const toolbar = props => (
  <Toolbar>
    <div>MENU</div>
    <Logo />
    <nav style={{ height: '100%' }}>...</nav>
  </Toolbar>
);

export default toolbar;
