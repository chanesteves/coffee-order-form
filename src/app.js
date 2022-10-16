import './app.css';
import Logo from './logo.png';

import styled from 'styled-components';

import OrderForm from './components/OrderForm';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img className="app-logo" src={Logo} />
      </header>
      <Content className="content-wrapper">
        <OrderForm />
      </Content>
    </div>
  );
}

export default App;

const Content = styled.div`
`