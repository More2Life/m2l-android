import React, {Component} from 'react';
import {
    Alert,
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
    TouchableNativeFeedback,
    Linking
} from 'react-native';
import { Button } from 'react-native-elements';
import ImageSlider from './ImageSlider';
import utils from '../utilities/utils';

class FeedItemDetail extends React.PureComponent {
    _getProduct = () => {
        Alert.alert("Get product!");
    }

    _takeAction = () => {
        switch (this.props.feedItem.type) {
            case 'story':
                Alert.alert('Story');
                break;
            case 'event':
                Linking.openURL(this.props.feedItem.eventUrl);
                break;
            case 'listing':
                this._getProduct();
                break;
            case 'donation':
                Linking.openURL('https://shopify.com');
                break;
            default:
                Linking.openURL('https://coachkalani.com');
        }
    }

    render() {
        let image = {
            uri: this.props.feedItem.feedImageUrl
        };
        return (
            <View style={{
                flex: 1
            }}>
                <Text style={styles.title}>{this.props.feedItem.title}</Text>
                <ImageSlider images={[
                        this.props.feedItem.feedImageUrl,
                        this.props.feedItem.feedImageUrl,
                        this.props.feedItem.feedImageUrl]}/>
                <Text>{this.props.feedItem.description}</Text>
                <Button
                    title={utils.getActionButtonLabel(this.props.feedItem.type)}
                    onPress={this._takeAction}
                    large={true}
                    backgroundColor={'#1673E6'}
                />
            </View>
        );
    }
}

class FeedItemDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.feedItem.title,
    });
    render() {
        return (
            <FeedItemDetail feedItem={this.props.navigation.state.params.feedItem}/>
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
    butt: {
        backgroundColor: '#1673E6',
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export {
    FeedItemDetail,
    FeedItemDetailScreen,
}
