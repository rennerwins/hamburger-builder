import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  outline: none;
  border: 1px solid #ccc;
  background-color: white;
  font: inherit;
  padding: 6px 10px;
  display: block;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background-color: #ccc;
  }
`;

const TextArea = Input.withComponent('textarea');
const Select = Input.withComponent('select');

const input = props => {
  let inputElement = null;

  switch (props.elementType) {
    case 'input':
      inputElement = <Input {...props.elementConfig} value={props.value} />;
      break;

    case 'textarea':
      inputElement = <TextArea {...props.elementConfig} value={props.value} />;
      break;

    case 'select':
      inputElement = (
        <Select value={props.value}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </Select>
      );
      break;

    default:
      inputElement = <Input {...props.elementConfig} value={props.value} />;
  }

  return (
    <InputWrapper>
      <Label>{props.label}</Label>
      {inputElement}
    </InputWrapper>
  );
};

export default input;
