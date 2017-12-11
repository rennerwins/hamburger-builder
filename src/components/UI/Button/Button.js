import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font: inherit;
  padding: 10px;
  margin: 10px;
  font-weight: bold;
  color: ${props => props.btnType === 'Success' && '#5c9210'};
  color: ${props => props.btnType === 'Danger' && '#944317'};

  &:first-of-type {
    margin-left: 0;
    padding-left: 0;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const button = props => (
  <Button disabled={props.disabled} btnType={props.btnType} onClick={props.clicked}>
    {props.children}
  </Button>
);

export default button;
