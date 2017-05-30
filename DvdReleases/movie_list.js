import React, { Component } from 'react';
import {
  Text,
  RefreshControl
} from 'react-native';
import GridView from 'react-native-grid-view';
import Movie from './movie.js';

const MOVIES_PER_ROW = 2;
const BASE_URL = 'https://xt6la9orzh.execute-api.eu-west-1.amazonaws.com/production/dvd-releases/';

export default class MovieList extends Component {
  constructor(props) {
    super();
    this.state = Object.assign({
      cache: {},
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
    let items = this.state.cache[this.props.endpoint];
    if (items) {
      return (
        <GridView
          items={items}
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
    else {
      return <Text>LOADING</Text>
    }
  }

  renderItem(item) {
    return <Movie key={item.id_} {...item} />
  }

  onRefresh() {
    this.setState(Object.assign({}, this.state, {refreshing: true}));
    return this.fetchData().then(function() {
      this.setState(Object.assign({}, this.state, {refreshing: false}));
    }.bind(this));
  }

  fetchData() {
    let fetchIt, endpoint = this.props.endpoint;
    if (this.state.cache[endpoint]) {
      return Promise.resolve(this.state.cache[endpoint]);
    }
    else {
      return this.getMoviesFromApiAsync().then(function(data) {
        let cache = Object.assign({}, this.state.cache);
        cache[endpoint] = data;
        this.setState(
          Object.assign({},
          this.state,
          {cache: cache, loaded: true, refreshing: false}));
        return data;
      }.bind(this));
    }
  }
}