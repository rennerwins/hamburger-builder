import React from 'react';

import Wrapper from '../../hoc/Wrapper';

const layout = ({ children }) => (
  <Wrapper>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>{children}</main>
  </Wrapper>
);

export default layout;
