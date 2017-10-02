import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import FeedItemList from './components/FeedItemList';

export default class App extends React.Component {
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

    getFeedItems = () => {
        // const {itemIndex, count} = this.state;
        // const url = 'https://m2l-server-dev.herokuapp.com/api/feeditems?index=${itemIndex}&count=${count}';
        const url = 'https://m2l-server-dev.herokuapp.com/api/feeditems';
        // this.setState({loading:true});
        fetch(url)
            .then(res => res.json())
            .then(res => {
                // const i = res[count-1] ? res[count-1]._id : null;
                const x = this.state.feedItems.length;
                console.log(res);
                this.setState({
                    // loading: false,
                    // refreshing: false,
                    // error: res.error || null,
                    // itemIndex: i,
                    feedItems: x ? res : [...this.state.feedItems, ...res]
                });
            })
            .catch(error => {
                console.error(error);
            });
    };

    render() {
        if (this.state.feedItems.length == 0) {
            return (
                <View>
                    <Text>{'Nothing here!'}</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <FeedItemList data={this.state.feedItems}/>
                </View>
            );
        }
    }
}

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
