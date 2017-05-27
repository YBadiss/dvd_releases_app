import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Linking
} from 'react-native';

export default class Movie extends Component {
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