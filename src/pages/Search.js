import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <div data-testid="page-search" type="text">
          <form>
            <input
              name="searchAlbum"
              type="text"
              data-testid="search-album-input"
              value /* ={ searchAlbum } */
              onChange
            />
            <button type="submit" data-testid="search-button">Pesquisar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
