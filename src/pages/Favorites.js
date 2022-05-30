import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    isLoading: true,
    favoritesSongs: [],
  };

  componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const favoritesSongs = ((await getFavoriteSongs()) || [])
        .map((element) => element);
      this.setState({ favoritesSongs, isLoading: false });
    });
  }

  findFavorite = (track) => {
    const { favoritesSongs } = this.state;
    return favoritesSongs.find((song) => song.trackId === track.trackId);
  }

  render() {
    const {
      isLoading,
      favoritesSongs,
    } = this.state;
    return (
      <div>
        <header>
          <Header />
        </header>
        <div data-testid="page-favorites">
          { isLoading ? <Loading /> : (
            favoritesSongs.map((track, index) => track.trackName && (
              <MusicCard
                key={ index }
                trackName={ track.trackName }
                src={ track.src }
                trackId={ track.trackId }
                image={ track.image }
                buttonTitle="Remover Favorita"
                isFavorite={ this.findFavorite(track) }
              />
            )))}
        </div>
      </div>
    );
  }
}

export default Favorites;
