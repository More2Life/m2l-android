import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Button,
    Alert,
    TouchableHighlight
} from 'react-native';

class FeedItem extends Component {
    _onPressButton() {
        Alert.alert('You tapped the button!')
    }

    render() {
        let image = {
            uri: this.props.feeditem.image
        };
        return (
            <View style={{
                flex: 1
            }}>
                <Text style={styles.title}>{this.props.feeditem.title}</Text>
                <TouchableHighlight onPress={this._onPressButton}>
                    <Image source={image} style={{
                        flex: 1,
                        aspectRatio: 1
                    }}/>
                </TouchableHighlight>
                <Button onPress={this._onPressButton} title="Press Me"/>
            </View>
        );
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item1: {
                title: 'Legend',
                image: 'https://cdn.shopify.com/s/files/1/2231/5113/products/Legend_Shirt_12-optimized.jpg?v=1505517105'
            },
            item2: {
                title: 'BYU vs. Boise State',
                image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F34000609%2F216775133792%2F1%2Foriginal.jpg?s=b2543faed39a9de3141d9141ef496cbb'
            }
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <FeedItem feeditem={this.state.item1}/>
                <FeedItem feeditem={this.state.item2}/>
            </ScrollView>
        );
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

// it chaged
