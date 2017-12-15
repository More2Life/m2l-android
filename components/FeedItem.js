import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableNativeFeedback,
    StyleSheet,
    Linking,
    Alert
} from 'react-native';
import { Button } from 'react-native-elements';

import FeedItemContent from './FeedItemContent';
import utils from '../utilities/utils';

export default class FeedItem extends React.Component {
    _onPressForDetail = () => {
        this.props.navigate('Detail', { feedItem: this.props.feedItem })
    };

    _getTypedFeedItem = () => {
        switch (this.props.feedItem.type) {
            case 'story':
                return (<StoryFeedItem feedItem={this.props.feedItem} onPressForDetail={this._onPressForDetail}/>);
                break;
            case 'event':
                return (<EventFeedItem feedItem={this.props.feedItem} onPressForDetail={this._onPressForDetail}/>);
                break;
            case 'listing':
                return (<ShopifyFeedItem feedItem={this.props.feedItem} onPressForDetail={this._onPressForDetail}/>);
                break;
            case 'donation':
                return (<ShopifyFeedItem feedItem={this.props.feedItem} onPressForDetail={this._onPressForDetail}/>);
                break;
            default:
                return (<View></View>)
        }
    }

    render() {
        return this._getTypedFeedItem();
    }
}

class ShopifyFeedItem extends React.Component {
    _onPressActionButton = () => {
        Alert.alert("Show variant options");
    }

    render() {
        return (
            <FeedItemContent
                feedItem={this.props.feedItem}
                onPressForDetail={this.props.onPressForDetail}>
                <Button
                    title={this.props.feedItem.price+""}
                    onPress={this._onPressActionButton}
                    backgroundColor={'#1673E6'}
                />
            </FeedItemContent>
        );
    }
}

class StoryFeedItem extends React.Component {
    render() {
        return (
            <FeedItemContent
                feedItem={this.props.feedItem}
                onPressForDetail={this.props.onPressForDetail}>
            </FeedItemContent>
        );
    }
}

class EventFeedItem extends React.Component {
    render() {
        return (
            <FeedItemContent
                feedItem={this.props.feedItem}
                onPressForDetail={this.props.onPressForDetail}>
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
