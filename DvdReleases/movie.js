import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Linking
} from 'react-native';
import OneSignal from 'react-native-onesignal';

export default class Movie extends Component {
  componentDidMount() {
    if (this.isReleased()) {
      OneSignal.deleteTag(this.props.id_);
    }
  }

  render() {
    return (
      <TouchableHighlight onPress={this.onMoviePressed.bind(this)}
                          onLongPress={this.onMovieLongPressed.bind(this)}
                          underlayColor={"#CCCCCC"}>
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

  onMovieLongPressed() {
    let releaseDate = new Date(this.props.release_date);
    let now = new Date();
    if (!this.isReleased()) {
      OneSignal.sendTag(this.props.id_, 'true');
      console.warn('Subscribed to', this.props.id_);
    }
    else {
      console.warn('The movie is already released');
    }
  }

  isReleased() {
    let releaseDate = new Date(this.props.release_date);
    let now = new Date();
    return now > releaseDate;
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