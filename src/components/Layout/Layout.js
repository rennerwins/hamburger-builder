import React from 'react';
import styled from 'styled-components';

import Wrapper from '../../hoc/Wrapper';

const MainContent = styled.main`margin-top: 16px;`;

const layout = ({ children }) => (
  <Wrapper>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <MainContent>{children}</MainContent>
  </Wrapper>
);

export default layout;
