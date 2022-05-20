import React from 'react';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search" type="text">
        <form>
          <button type="submit" data-testid="search-button">Pesquisar</button>
        </form>
      </div>
    );
  }
}

export default Search;
