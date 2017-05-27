/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import Tabs from 'react-native-tabs';

import MovieView from './movie_view.js';

const TAB_OPTIONS = {
  new: {title: 'New Dvd Releases', endpoint: 'new'},
  future: {title: 'Future Dvd Releases', endpoint: 'future'}
};

export default class DvdReleases extends Component {
  constructor() {
    super();
    this.state = {
      selectedPage: 'new'
    };
  }

  render() {
    let tab_option = TAB_OPTIONS[this.state.selectedPage];

    return (
      <View style={styles.container}>
        <MovieView style={styles.movie_view} title={tab_option.title} endpoint={tab_option.endpoint} />
        <Tabs selected={this.state.selectedPage} style={{backgroundColor:'white'}}
              selectedStyle={{color:'red'}} onSelect={this.updateSelectedTab.bind(this)}>
            <Text name='new'>New Releases</Text>
            <Text name='future'>Future Releases</Text>
        </Tabs>
      </View>
    );
  }

  updateSelectedTab(el) {
    this.setState(Object.assign({}, this.state, {selectedPage: el.props.name}));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movie_view: {
    marginBottom: 30
  }
});

AppRegistry.registerComponent('DvdReleases', () => DvdReleases);
