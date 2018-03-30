import React from 'react';
import styled from 'styled-components';

import LocaleToggle from './LocaleToggle';
import registerGlobals from '../global-styles';

registerGlobals();

const LayoutWrapper = styled.div`
  height: 100vh !important;
`;

export default ({ children }) => {
  return (
    <LayoutWrapper>
      <div id="container" className="fitParent">
        <LocaleToggle />

        {children}
      </div>
    </LayoutWrapper>
  );
};
