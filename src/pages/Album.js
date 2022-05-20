import React from 'react';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <div data-testid="page-album">
          <form>
            <input
              type="text"
            />
            <button
              type="button"
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Album;
