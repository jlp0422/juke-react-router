import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Player from './Player';

export default class Main extends Component {

  constructor (props) {
    super(props);
    this.state = {
      albums: [],
      selectedAlbum: {},
      artists: [],
      selectedArtist: {},
      selectedArtistAlbums: []
    };
    this.selectAlbum = this.selectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.artistAlbums = this.artistAlbums.bind(this);
  }

  componentDidMount () {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(albums => {
        this.setState({ albums })
      })
    axios.get('/api/artists/')
      .then(res => res.data)
      .then(artists => this.setState({ artists }))
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: album
      }))
  }

  selectArtist(artistId) {
    axios.get(`/api/artists/${artistId}`)
      .then(res => res.data)
      .then(artist => this.setState({
        selectedArtist: artist
      }));
  }

  artistAlbums(artistId) {
    axios.get(`/api/artists/${artistId}/albums`)
      .then(res => res.data)
      .then(artistAlbums => this.setState({
        selectedArtistAlbums: artistAlbums
      }))
  }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselectAlbum={this.deselectAlbum} />
        </div>
        <div className="col-xs-10">
          {
            this.props.children ?
              React.cloneElement(this.props.children, {

                // Album (singular) component's props
                album: this.state.selectedAlbum,
                currentSong: this.state.currentSong,
                isPlaying: this.state.isPlaying,
                toggle: this.toggleOne,
                artist: this.state.selectedArtist,
                artistAlbums: this.artistAlbums,
                selectedArtistAlbums: this.state.selectedArtistAlbums,

                // Albums (plural) component's props
                albums: this.state.albums,
                artists: this.state.artists,
                selectAlbum: this.selectAlbum, // note that this.selectAlbum is a method, and this.state.selectedAlbum is the chosen album
                selectArtist: this.selectArtist
              })
              : null
          }
        </div>
        <Player />
      </div>
    );
  }
}
