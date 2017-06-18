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
  constructor(props) {
    super(props);
    this.state = {
      isFavourite: props.isFavourite
    }
  }

  componentDidMount() {
    if (this.state.isFavourite && this.isReleased()) {
      this.reverseSubscription();
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
          {this.state.isFavourite &&
            <Image source={require('./img/hearth1.png')} resizeMode='cover' style={styles.favoriteIcon} />
          }
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
    if (!this.isReleased()) {
      this.reverseSubscription();
    }
    else {
      console.warn('Already released');
    }
  }

  reverseSubscription() {
    let isFavourite = this.state.isFavourite;
    let action = isFavourite ? this.props.api.unsubscribeFromMovie : this.props.api.subscribeToMovie;
    action = action.bind(this.props.api);
    return action(this.props.id_).then(function(success) {
        if (success) {
          this.setState(Object.assign({}, this.state, {isFavourite: !isFavourite}));
        }
        else {
          console.warn('Failed to change subscription for ', this.props.id_);
        }
    }.bind(this));
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
  favoriteIcon: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 30,
    height: 26
  }
});