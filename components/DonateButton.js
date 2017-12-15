/* @flow */

import React, {Component} from 'react';
import {Button, Alert, StyleSheet} from 'react-native';

export default class DonateButton extends Component {

    _onPress = () => {
        if (this.props.onPress) this.props.onPress();
    }

    render() {
        return (<Button title="Donate" onPress={this._onPress} disabled={true && !this.props.show}/>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
