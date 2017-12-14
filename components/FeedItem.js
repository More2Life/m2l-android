import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableNativeFeedback,
    StyleSheet
} from 'react-native';
import { Button } from 'react-native-elements';
import utils from '../utilities/utils';

const shopify = utils.getShopifyClient();

export default class FeedItem extends React.Component {

    _fetchProductFromShopify = (feedItemHandle, callback) => {
        shopify.fetchProductByHandle(feedItemHandle)
            .then( (product) => {
                //console.log(JSON.stringify(product));
                callback(JSON.parse(JSON.stringify(product)));
            })
            .catch((e) => {
                console.log(e);
            });
    };

    _onPressForDetail = (feedItem) => {
        this._fetchProductFromShopify(feedItem.handle, (product) => {
            this.props.navigate('Detail', { feedItem: feedItem, product: product })
        });
    };

    _onPressActionButton = (handle) => {
        this._fetchProductFromShopify(handle, () => {
            console.log('from callback');
        });
    };

    // _onPressForDetail = () => {
    //     this.props.onPressForDetail(this.props.feedItem);
    // };
    //
    // _onPressActionButton = () => {
    //     this.props.onPressActionButton(this.props.feedItem.handle);
    // }

    _switchOnFeedItemType() {
        const itemToRender = null;
        switch (this.props.feedItem.type) {
            case 'story':
                itemToRender = <FeedStory
                    feedItem={this.props.feedItem}
                    navigate={this.props.navigate}
                />
                break;
            case 'event':
                Linking.openURL(this.props.feedItem.eventUrl);
                break;
            case 'listing':
                this._getProduct();
                break;
            case 'donation':
                Linking.openURL('https://shopify.com');
                break;
            default:
                itemToRender = <View></View>
        }
        return itemToRender;
    }

    render() {
        let image = {
            uri: this.props.feedItem.feedImageUrl
        };
        return (
            <View style={{flex: 1}}>
                <Text style={styles.title}>{this.props.feedItem.title}</Text>
                <TouchableNativeFeedback onPress={this._onPressForDetail}>
                    <Image source={image} style={{
                        flex: 1,
                        aspectRatio: 1
                    }}/>
                </TouchableNativeFeedback>
                <Button
                    title={utils.getActionButtonLabel(this.props.feedItem.type)}
                    onPress={this._onPressActionButton}
                    backgroundColor={'#1673E6'}
                />
            </View>
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
