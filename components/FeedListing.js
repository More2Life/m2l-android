import React from 'react';
import FeedItemContent from './FeedItemContent';
import utils from '../utilities/utils';

export default class FeedListing extends React.Component {
    render() {
        return (
            <FeedItemContent
                feedItem={this.props.feedItem}
                onPressForDetail={this._onPressForDetail}
                onPressActionButton={this._onPressActionButton}
            />
        );
    }
}
