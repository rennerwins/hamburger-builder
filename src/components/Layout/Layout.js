import React from 'react';

import Wrapper from '../../hoc/Wrapper';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = ({ children }) => (
  <Wrapper>
    <Toolbar />
    <main style={{ marginTop: '72px' }}>{children}</main>
  </Wrapper>
);

export default layout;
