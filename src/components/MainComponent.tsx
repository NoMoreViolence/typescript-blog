import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App';

const MainComponent = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default MainComponent;
