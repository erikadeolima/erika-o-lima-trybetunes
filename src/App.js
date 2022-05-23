import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';

class App extends React.Component {
  render() {
    return (
      // Você deve utilizar o BrowserRouter pra criar as rotas da sua aplicação e cada rota deverá renderizar um componente específico.
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Content />
      </BrowserRouter>
    );
  }
}

export default App;
