import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet
} from 'react-native';

class FeedItemDetail extends React.PureComponent {
    render() {
        let image = {
            uri: this.props.feedItem.feedImageUrl
        };
        return (
            <View style={{flex: 1}}>
                <Text style={styles.title}>{this.props.feedItem.title}</Text>
                <Image source={image} style={{
                    flex: 1,
                    aspectRatio: 1
                }}/>
                <Text>{this.props.feedItem.description}</Text>
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
    }
});

export {
    FeedItemDetail,
    FeedItemDetailScreen,
}
