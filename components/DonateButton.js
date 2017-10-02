/* @flow */

import React, { Component } from 'react';
import {
  Button,
  Alert,
  StyleSheet,
} from 'react-native';

export default class DonateButton extends Component {
  render() {
    return (
      <Button title="Donate" onPress={()=>{Alert.alert('Thanks!')}}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
