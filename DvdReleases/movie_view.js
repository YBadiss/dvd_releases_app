import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import MovieList from './movie_list.js';

export default class MovieView extends Component {
  constructor(props) {
    super();
    this.state = this.stateFromProps(props);
  }

  stateFromProps(props) {
    return {
      title: props.title,
      endpoint: props.endpoint
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState(Object.assign({}, this.state, this.stateFromProps(newProps)));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.state.title}
        </Text>
        <MovieList endpoint={this.state.endpoint}
                   favourites={this.props.favourites}
                   api={this.props.api} />
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
    marginTop: 50,
    marginBottom: 30
  }
});
