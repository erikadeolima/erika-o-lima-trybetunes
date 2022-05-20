import React from 'react';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <div data-testid="page-favorites">
          <form>
            <span
              type="text"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Favorites;
