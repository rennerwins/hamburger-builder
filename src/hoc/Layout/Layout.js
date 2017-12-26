import { connect } from 'react-redux';
import React, { Component } from 'react';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Wrapper from '../../hoc/Wrapper/Wrapper';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState(() => ({ showSideDrawer: false }));
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({
      showSideDrawer: !prevState.showSideDrawer
    }));
  };

  render() {
    const { isAuthenticated } = this.props;

    return (
      <Wrapper>
        <Toolbar isAuth={isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main style={{ marginTop: '72px' }}>{this.props.children}</main>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { token } = auth;

  return {
    isAuthenticated: token !== null
  };
};

export default connect(mapStateToProps, null)(Layout);
