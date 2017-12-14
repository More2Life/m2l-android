import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    StatusBar
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Promise from 'bluebird';
import FeedItemList from './components/FeedItemList';
import { FeedItemDetailScreen } from './components/FeedItemDetail';
import DonateButton from './components/DonateButton';
import utils from './utilities/utils';

// ==> an extreme hack but apparently absolutely critical
if (!global.atob) {
    global.atob = require('base-64').decode;
    global.btoa = require('base-64').encode;
}// ======================================================

const shopify = utils.getShopifyClient();

class FeedScreen extends React.Component {
    static navigationOptions = {
        title: 'More2Life',
        headerRight: <DonateButton />,
        headerStyle: {
            paddingRight: 15
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
            itemIndex: null,
            count: 2,
            error: null,
            feedItems: []
        };
    }

    componentDidMount() {
        this.getFeedItems();
    }

    getFeedItems = async () => {
        // const {itemIndex, count} = this.state;
        // const url = 'https://m2l-server-dev.herokuapp.com/api/feeditems?index=${itemIndex}&count=${count}';
        const url = 'https://m2l-server-dev.herokuapp.com/api/feeditems';
        // this.setState({loading:true});
        var results = await(await fetch(url)).json();
        var feedItems = await Promise.map(results, async (res) => {
            if (res.type == 'listing' || res.type == 'donation')
                res.shopifyData = await shopify.fetchProductByHandle(res.handle);
            return res;
        });
        console.log("Here are the feedItems", feedItems);
        this.setState({
            feedItems: this.state.feedItems.length ? feedItems : [...this.state.feedItems, ...feedItems]
        });

        // fetch(url)
        //     .then(res => res.json())
        //     .then(res => {
        //         // const i = res[count-1] ? res[count-1]._id : null;
        //         const numFeedItems = this.state.feedItems.length;
        //         // console.log(res);
        //         this.setState({
        //             // loading: false,
        //             // refreshing: false,
        //             // error: res.error || null,
        //             // itemIndex: i,
        //             feedItems: numFeedItems ? res : [...this.state.feedItems, ...res]
        //         });
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
    };

    render() {
        const {navigate} = this.props.navigation;
        if (this.state.feedItems.length == 0) {
            return (
                <View>
                    <Text>{'Fetching the feed...'}</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <FeedItemList feedItems={this.state.feedItems} navigate={navigate}/>
                </View>
            );
        }
    }
}

export default App = StackNavigator(
    {
        Feed: { screen: FeedScreen },
        Detail: { screen: FeedItemDetailScreen }
    },
    {
        cardStyle: { paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight }
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    title: {
        color: "#1673E6",
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: 5
    }
});
