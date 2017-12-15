import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableNativeFeedback,
    StyleSheet
} from 'react-native';
import { Button } from 'react-native-elements';

import FeedItemContent from './FeedItemContent';
import utils from '../utilities/utils';

export default class FeedItem extends React.PureComponent {
    _onPressForDetail = () => {
        this.props.navigate('Detail', { feedItem: this.props.feedItem })
    };

    _onPressActionButton = () => {
        console.log("press buy");
    };

    render() {
        return (
            <FeedItemContent
                feedItem={this.props.feedItem}
                onPressForDetail={this._onPressForDetail}>
                <Button
                    title={utils.getActionButtonLabel(this.props.feedItem.type)}
                    onPress={this._onPressActionButton}
                    backgroundColor={'#1673E6'}
                />
            </FeedItemContent>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: "#1673E6",
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 5
    },
});
