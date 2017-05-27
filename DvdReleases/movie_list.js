import React, { Component } from 'react';
import {
  Text,
  RefreshControl
} from 'react-native';
import GridView from 'react-native-grid-view';
import Movie from './movie.js';

const MOVIES_PER_ROW = 2;
const BASE_URL = 'https://xt6la9orzh.execute-api.eu-west-1.amazonaws.com/production/dvd-releases/';

var movieData = {};

export default class MovieList extends Component {
  constructor(props) {
    super();
    this.state = Object.assign({
      dataSource: [],
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

  getMoviesFromApiAsync() {
    return fetch(BASE_URL + this.props.endpoint)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.refreshing) {
      return <Text>LOADING</Text>
    }
    else {
      return (
        <GridView
          items={this.state.dataSource}
          itemsPerRow={MOVIES_PER_ROW}
          renderItem={this.renderItem}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
        />
      );
    }
  }

  renderItem(item) {
    return <Movie key={item.title} {...item} />
  }

  onRefresh() {
    this.setState(Object.assign({}, this.state, {refreshing: true}));
    this.fetchData().then(function(data) {
      this.setState(
        Object.assign({},
        this.state,
        {dataSource: data, loaded: true, refreshing: false}));
    }.bind(this));
  }

  fetchData() {
    let fetchIt, endpoint = this.props.endpoint;
    if (movieData[this.props.endpoint]) {
      return Promise.resolve(movieData[endpoint]);
    }
    else {
      return this.getMoviesFromApiAsync().then(function(data) {
        movieData[endpoint] = data;
        return data;
      });
    }
  }
}