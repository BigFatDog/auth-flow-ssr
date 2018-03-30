import { injectGlobal } from 'styled-components';

import boostrapStyle from 'bootstrap/dist/css/bootstrap.min.css';

import mainStyle from '../styles/main.css';
import fontawesome from '../styles/fontawesome-all.css';
import openSans from '../styles/open-sans.css';

const registerGlobals = () => {
  injectGlobal`${fontawesome}`;
  injectGlobal`${openSans}`;
  injectGlobal`${mainStyle}`;
  injectGlobal`${boostrapStyle}`;
};

export default registerGlobals;
