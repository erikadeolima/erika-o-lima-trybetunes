import React from 'react';

class Album extends React.Component {
  render() {
    return (
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
    );
  }
}

export default Album;
