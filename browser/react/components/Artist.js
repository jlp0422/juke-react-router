/* eslint-disable */
import React, { Component } from 'react';
import Songs from '../components/Songs';

export default class Artist extends Component {
  componentDidMount() {
    const artistId = this.props.routeParams.artistId;
    const selectArtist = this.props.selectArtist;
    const artistAlbums = this.props.artistAlbums;
    selectArtist(artistId);
    artistAlbums(artistId);
  }
  render() {
    console.log(this.props)
    const artist = this.props.artist;
    const albums = this.props.selectedArtistAlbums
    const songArray = albums.map(album => album.songs)
    const allSongs = songArray.reduce((memo, item)=> {
      return memo.concat(item)
    }, [])
    return (
      <div>
        <h3>{ artist.name }</h3>
        <h3>Albums</h3>
        {
          albums &&
          albums.map(album => (
            <div className="col-xs-4 thumbnail" key={album.id}>
              <h4>{ album.name }</h4>
              <img src={album.imageUrl} />
            </div>
          ))
        }
        <h3 className="col-xs-12">Songs</h3>
        {
          albums &&
          <Songs songs={allSongs} />
        }
      </div>
    );
  }
}
