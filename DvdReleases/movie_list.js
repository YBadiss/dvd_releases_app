import React, { Component } from 'react';
import {
  Text,
  RefreshControl
} from 'react-native';
import GridView from 'react-native-grid-view';
import Movie from './movie.js';

const MOVIES_PER_ROW = 2;

export default class MovieList extends Component {
  constructor(props) {
    super();
    this.state = Object.assign({
      movies: undefined,
      loaded: false,
      refreshing: false
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.endpoint != this.props.endpoint) {
      this.onRefresh();
    }
  }

  componentDidMount() {
    this.onRefresh();
  }

  render() {
    let items = this.state.movies;
    if (items) {
      return (
        <GridView
          items={items}
          itemsPerRow={MOVIES_PER_ROW}
          renderItem={this.renderItem.bind(this)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
      );
    }
    else {
      return <Text>LOADING</Text>
    }
  }

  renderItem(item) {
    item.isFavourite = this.props.favourites.indexOf(item.id_) >= 0;
    return <Movie key={item.id_} api={this.props.api} {...item} />
  }

  onRefresh() {
    this.setState(Object.assign({}, this.state, {refreshing: true}));
    return this.props.api.getMovies(this.props.endpoint).then(function(movies) {
      this.setState(Object.assign({}, this.state, {movies: movies, refreshing: false}));
    }.bind(this));
  }
}