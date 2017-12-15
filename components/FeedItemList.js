import React from 'react';
import {
    FlatList
} from 'react-native';
import FeedItem from './FeedItem'
import utils from '../utilities/utils';

const shopify = utils.getShopifyClient();

export default class FeedItemList extends React.Component {
    constructor(props) {
        super(props);
    };

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

    _onPressItem = (feedItem) => {
        this._fetchProductFromShopify(feedItem.handle, (product) => {
            this.props.navigate('Detail', { feedItem: feedItem, product: product })
        })
    };

    _onPressBuy = (handle) => {
        this._fetchProductFromShopify(handle, () => {
            console.log('from callback');
        });
    };

    _renderFeedItem = ({item}) => (
        <FeedItem
            feedItem = {item}
            onPressItem = {this._onPressItem}
            onPressBuy = {this._onPressBuy}
        />
    );

    render() {
        return (
            <FlatList
                data={this.props.feedItems}
                keyExtractor={item => item._id}
                renderItem={this._renderFeedItem}
                extraData={this.state}
                refreshing={this.props.refreshing}
                onRefresh={this.props.onRefresh}
            />
        )
    }
}
