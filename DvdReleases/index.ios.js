/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MovieList from './movie_list.js';

export default class DvdReleases extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          New Dvd Releases
        </Text>
        <MovieList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
  },
  list: {
    margin: 10
  }
});

AppRegistry.registerComponent('DvdReleases', () => DvdReleases);
