import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    isLoading: true,
    collection: {},
    tracks: [],
    favoritesSongs: [],
  };

  componentDidMount() {
    const { match } = this.props;

    const { params } = match;
    const { id } = params;
    /* Faz a requisição a API, porém por ser uma consulta que será carregana no corpo da pag sem um evento, fiz a construção no didMount para que a requisição aconteça somente depois da pag montada, assim não demora para o carregamento, e nem quebra quando a API n estiver disponivel */
    getMusics(id).then((response) => (
      this.setState({
        collection: response[0],
        isLoading: false,
        tracks: response
          .filter(({ previewUrl }) => previewUrl)
          .map(({ previewUrl, trackName, trackId, artworkUrl100 }) => (
            { previewUrl, trackName, trackId, artworkUrl100 }
          )),
      })
    ));
    /* é resposavel por armazenar o checked da favorite songs e quando a pag carregar ela ser atualizada junto e não perdida */
    this.setState({ isLoading: true }, async () => {
      const favoritesSongs = await getFavoriteSongs();
      this.setState({ favoritesSongs, isLoading: false });
    });
  }

  /* é responsavel por buscar o checked da minha musica favorita e guardar ela na  para que o checked seja carregado no music card e quando ele for usado */
  findFavorite = (track) => {
    const { favoritesSongs } = this.state;
    return favoritesSongs.find((song) => JSON.parse(song).trackId === track.trackId);
  }

  render() {
    const {
      isLoading,
      collection,
      tracks,
    } = this.state;
    return (
      <div>
        <header>
          <Header />
        </header>
        { isLoading
          ? <Loading /> : (
            <div>
              <div data-testid="page-album" />
              <img src={ collection.artworkUrl100 } alt={ collection.collectionName } />
              <h3 data-testid="artist-name">{collection.artistName}</h3>
              <h4 data-testid="album-name">{collection.collectionName}</h4>
              {tracks.map((track, index) => track.trackName && (
                <MusicCard
                  key={ index }
                  trackName={ track.trackName }
                  src={ track.previewUrl }
                  trackId={ track.trackId }
                  image={ track.artworkUrl100 }
                  isFavorite={ this.findFavorite(track) }
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
