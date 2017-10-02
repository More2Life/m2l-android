import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableNativeFeedback,
    StyleSheet
} from 'react-native';

export default class FeedItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.feedItem);
    };

    render() {
        let image = {
            uri: this.props.feedItem.feedImageUrl
        };
        return (
            <View style={{flex: 1}}>
                <Text style={styles.title}>{this.props.feedItem.title}</Text>
                <TouchableNativeFeedback onPress={this._onPress}>
                    <Image source={image} style={{
                        flex: 1,
                        aspectRatio: 1
                    }}/>
                </TouchableNativeFeedback>
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
    }
});
