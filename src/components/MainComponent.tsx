import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App';

class MainComponent extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}

export default MainComponent;
