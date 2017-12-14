import React from 'react';
import {
    FlatList
} from 'react-native';
import FeedItem from './FeedItem'
import utils from '../utilities/utils';

export default class FeedItemList extends React.Component {
    constructor(props) {
        super(props);
    };

    _renderFeedItem = ({item}) => (
        <FeedItem
            feedItem = {item}
            navigate = {this.props.navigate}
        />
    );

    render() {
        return (
            <FlatList
                data={this.props.feedItems}
                keyExtractor={item => item._id}
                renderItem={this._renderFeedItem}
                extraData={this.state}
            />
        )
    }
}
