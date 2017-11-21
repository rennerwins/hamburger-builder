import React from 'react';

import Wrapper from '../../hoc/Wrapper';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const layout = ({ children }) => (
  <Wrapper>
    <Toolbar />
    <SideDrawer />
    <main style={{ marginTop: '72px' }}>{children}</main>
  </Wrapper>
);

export default layout;
