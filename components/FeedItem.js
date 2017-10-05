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

export default class FeedItem extends React.PureComponent {
    _onPressDetail = () => {
        this.props.onPressItem(this.props.feedItem);
    };

    _onPressBuy = () => {
        this.props.onPressBuy(this.props.feedItem.handle);
    }

    render() {
        let image = {
            uri: this.props.feedItem.feedImageUrl
        };
        return (
            <View style={{flex: 1}}>
                <Text style={styles.title}>{this.props.feedItem.title}</Text>
                <TouchableNativeFeedback onPress={this._onPressDetail}>
                    <Image source={image} style={{
                        flex: 1,
                        aspectRatio: 1
                    }}/>
                </TouchableNativeFeedback>
                <Button
                    title={utils.getActionButtonLabel(this.props.feedItem.type)}
                    onPress={this._onPressBuy}
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
