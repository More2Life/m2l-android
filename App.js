import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    StatusBar,
    ActivityIndicator,
    Alert
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
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            refreshing: false,
            itemIndex: null,
            count: 2,
            error: null,
            feedItems: [],
            donationBuckets: null
        };
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        let headerRight = (
            <DonateButton
                show={params.show}
                onPress={params.pressDonate}/>
        );

        return {
            title: 'More2Life',
            headerRight: headerRight,
            headerStyle: {
                paddingRight: 15
            }
        };
    };

    _pressDonate = () => {
        Alert.alert("The Component gets to tell the header button what to do.");
    }

    _getFeedItems = async () => {
        // const {itemIndex, count} = this.state;
        // const url = 'https://m2l-server-dev.herokuapp.com/api/feeditems?index=${itemIndex}&count=${count}';
        const url = 'https://m2l-server-dev.herokuapp.com/api/feeditems';
        // this.setState({loading:true});

        var raw = await shopify.fetchProductByHandle(utils.getDonationBucketId());
        raw = JSON.parse(JSON.stringify(raw));
        var buckets = {};
        buckets.variants = raw.variants.map((v) => {
            return (({ available, id, price, title }) => ({ available, id, price, title }))(v);
        });
        buckets.id = raw.id;
        buckets.handle = raw.handle;

        var results = await(await fetch(url)).json();
        var feedItems = await Promise.map(results, async (res) => {
            if (res.type == 'listing' || res.type == 'donation') {
                var shopifyData = await shopify.fetchProductByHandle(res.handle);
                shopifyData = JSON.parse(JSON.stringify(shopifyData));
                res.shopify = this._extractShopifyData(shopifyData);
            } else if (res.type == 'story') {
                res.buckets = buckets;
            }
            return res;
        });

        this.setState({
            feedItems: this.state.feedItems.length ? feedItems : [...this.state.feedItems, ...feedItems],
            donationBuckets: buckets,
            loading: false
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
    }

    _extractShopifyData = (shopifyData) => {
        var mapped = {};
        mapped.images = shopifyData.images.map((i) => {
            return (({ id, src }) => ({ id, src }))(i);
        });
        mapped.variants = shopifyData.variants.map((v) => {
            return (({ available, id, price, title }) => ({ available, id, price, title }))(v);
        });
        mapped.id = shopifyData.id;
        return mapped;
    }

    async componentDidMount() {
        await this._getFeedItems();
        this.props.navigation.setParams({
            show: true,
            pressDonate: this._pressDonate
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <FeedItemList
                    feedItems={this.state.feedItems}
                    navigate={navigate}
                    refreshing={this.state.loading}
                    onRefresh={this._getFeedItems}
                />
                <ActivityIndicator style={styles.loading} size={'large'} animate={this.props.loading}/>
            </View>
        );
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
    },
    loading: {
        marginTop: 20
    }
});
