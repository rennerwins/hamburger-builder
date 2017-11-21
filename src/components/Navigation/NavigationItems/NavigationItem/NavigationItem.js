import React from 'react';
import styled from 'styled-components';

const NavigationItem = styled.li`
  margin: 0;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  align-items: center;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
  height: 100%;
  padding: 16px 10px;
  border-bottom: 4px solid ${props => (props.active ? '#40a4c8' : 'transparent')};
  box-sizing: border-box;
  display: block;
  background: ${props => props.active && '#8f5c2c'};

  &:hover,
  &:active {
    background-color: #8f5c2c;
    border-bottom: 4px solid #40a4c8;
    color: white;
  }
`;

const navigationItem = props => (
  <NavigationItem>
    <Link href={props.link} active={props.active}>
      {props.children}
    </Link>
  </NavigationItem>
);

export default navigationItem;
