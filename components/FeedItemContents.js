import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableNativeFeedback,
    StyleSheet
} from 'react-native';
import { Button } from 'react-native-elements';

export default class FeedItemContent extends React.Component {
    _onPressForDetail = () => {
        this.props.onPressForDetail();
    }

    _onPressActionButton = () => {
        this.props.onPressActionButton();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={styles.title}>{this.props.feedItem.title}</Text>
                <TouchableNativeFeedback onPress={this._onPressForDetail}>
                    <Image source={image} style={{
                        flex: 1,
                        aspectRatio: 1
                    }}/>
                </TouchableNativeFeedback>
                <Button
                    title={utils.getActionButtonLabel(this.props.feedItem.type)}
                    onPress={this._onPressActionButton}
                    backgroundColor={'#1673E6'}
                />
            </View>
        );
    }
}
