import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends React.Component {
  state = {
    isLoading: true,
    collection: {},
    tracks: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
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
    params: PropTypes.shape(PropTypes.string).isRequired,
  }).isRequired,
};

export default Album;
