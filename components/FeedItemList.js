import React from 'react';
import {
    Alert,
    FlatList
} from 'react-native';
import FeedItem from './FeedItem'

export default class FeedItemList extends React.PureComponent {
    state = {selected: (new Map(): Map<string, boolean>)};

    _onPressItem = (feedItem) => {
        this.props.navigate('Detail', { feedItem: feedItem })
    };

    _renderItem = ({item}) => (
        <FeedItem
            feedItem = {item}
            onPressItem = {this._onPressItem}
            selected = {!!this.state.selected.get(item._id)}
        />
    );

    render() {
        return (
            <FlatList
                data={this.props.data}
                keyExtractor={item => item._id}
                renderItem={this._renderItem}
                extraData={this.state}
            />
        )
    }
}
