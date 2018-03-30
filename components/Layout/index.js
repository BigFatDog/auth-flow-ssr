import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import registerGlobals from '../global-styles';

registerGlobals();

const LayoutWrapper = styled.div`
  height: 100vh !important;
`;

export default ({ children }) => {
  return (
    <LayoutWrapper>
      <div id="container" className="fitParent">
        <Header />
        {/* {showConnectionIssue && !connected */}
        {/* ? <ConnectionNotification /> */}
        {/* : null} */}
        <div
          className="content-wrapper"
          style={{
            position: 'relative',
            top: '50px',
            height: 'calc(100% - 50px)',
          }}
        >
          {children}
        </div>
      </div>
    </LayoutWrapper>
  );
};
