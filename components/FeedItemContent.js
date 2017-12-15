/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image
} from 'react-native';

export default class FeedItemContent extends Component {
  render() {
    return (
      <View style={styles.container}>
          <FeedItemTitle text={this.props.feedItem.title}/>
          <FeedItemImage onPress={this.props.onPressForDetail} src={{uri: this.props.feedItem.feedImageUrl}}/>
          {this.props.children}
      </View>
    );
  }
}

FeedItemTitle = (props) => {
    return <Text style={styles.title}>{props.text}</Text>;
}

FeedItemImage = (props) => {
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <Image source={props.src} style={styles.feedImage}/>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
      color: "#1673E6",
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 10,
      marginBottom: 5,
      marginHorizontal: 5
  },
  feedImage: {
      flex: 1,
      aspectRatio: 1
  }
});
