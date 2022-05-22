import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    favorited: false,
  }

  favoriteSong = ({ target }) => {
    const { track } = this.props;
    this.setState({ isLoading: true, favorited: target.checked }, async () => {
      await addSong(track);
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { trackName, previewUrl, trackId, isFavorite } = this.props;
    const { isLoading, favorited } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <img src={ previewUrl } alt={ trackName } />
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor="favorites">
          Favorita
          <input
            type="checkbox"
            id="favorites"
            checked={ isFavorite || favorited }
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.favoriteSong }
          />
        </label>
        {isLoading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};

export default MusicCard;
