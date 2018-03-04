/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Albums from './components/AllAlbums';
import Album from './components/SingleAlbum';
import Artist from './components/Artist';
import Artists from './components/Artists';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory} >
    <Route path='/' component={ Main } >
      <IndexRedirect to='/albums' />
      <Route path='/albums' component={ Albums } />
      <Route path="/albums/:albumId" component={ Album } />
      <Route path='/artists' component={ Artists } />
      <Route path="/artists/:artistId" component={ Artist } />
    </Route>
  </Router>,
  document.getElementById('app')
);
