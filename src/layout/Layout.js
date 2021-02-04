import React from 'react';
import { GlobalStyle } from '../styles/GlobalStyle';
import { Typography } from '../styles/Typography';
import { IconStyles } from '../styles/IconStyles';
import 'normalize.css';
import { MousePointer } from '../components/MousePointer';

import styled from 'styled-components';

var LayoutStyles = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

export function Layout({ children }) {
  return (
    <LayoutStyles>
      <MousePointer />
      <IconStyles />
      <Typography />
      <GlobalStyle />
      {children}
    </LayoutStyles>
  );
}
