import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Linking,
  RefreshControl
} from 'react-native';
import GridView from 'react-native-grid-view';

const MOVIES_PER_ROW = 2;

export default class MovieList extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      loaded: false,
      refreshing: false
    };
  }

  getMoviesFromApiAsync() {
    return fetch('https://5yw1u1sqa6.execute-api.eu-west-1.amazonaws.com/production/new-dvd-releases')
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
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

  renderItem(item) {
    return <Movie key={item.title} {...item} />
  }

  onRefresh() {
    this.setState(Object.assign({}, this.state, {refreshing: true}));
    this.fetchData().then(() => {
      this.setState(Object.assign({}, this.state, {refreshing: false}));
    });
  }

  fetchData() {
    return this.getMoviesFromApiAsync().then(function(movies) {
      this.setState(Object.assign({}, this.state, {dataSource: movies, loaded: true}));
    }.bind(this));
  }
}

class Movie extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.onMoviePressed.bind(this)} underlayColor={"#CCCCCC"}>
        <View style={styles.movie}>
          <Image
            style={styles.poster}
            source={{uri: this.props.poster}}
          />
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  onMoviePressed() {
    let url = this.props.more_info;
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
}

const styles = StyleSheet.create({
  movie: {
    height: 150,
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 30
  },
  poster: {
    flex: 1,
    width: 100,
    height: 150,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 12,
    marginTop: 8,
    width: 170,
    textAlign: 'center',
  },
});