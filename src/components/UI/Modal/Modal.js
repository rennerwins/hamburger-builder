import React, { Component } from 'react'
import styled from 'styled-components'

import Wrapper from '../../../hoc/Wrapper/Wrapper'
import Backdrop from '../Backdrop/Backdrop'

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 70%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  opacity: ${props => (props.show ? '1' : '0')};
  transform: ${props => (props.show ? 'translateY(0)' : 'translateY(-100vh)')};
  transition: all 0.3s ease-out;

  @media (min-width: 600px) {
    width: 500px;
    left: calc(50% - 250px);
  }
`

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  render() {
    return (
      <Wrapper>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <ModalWrapper show={this.props.show}>{this.props.children}</ModalWrapper>
      </Wrapper>
    )
  }
}

export default Modal
