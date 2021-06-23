import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { Text, View, Image, Alert } from 'react-native'
import { ListItem, Avatar, SearchBar, Rating } from 'react-native-elements'
import { FlatList } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { TouchableOpacity } from 'react-native';
import { Provider, TextInput, Title, Button, HelperText, Portal, Modal, ProgressBar } from 'react-native-paper'
import { sendRequest } from '../service/UserService';

export default class DetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            button: '',
            visible:false
        }
    }
    getListData = (data) => {
        const list = [
            {
                name: 'Title',
                description: data.name
            },
            {
                name: 'Address',
                description: data.address
            },
            {
                name: 'Category',
                description: data.category
            },
            {
                name: 'Description',
                description: data.description
            },
            {
                name: 'Rating',
                description: <Rating imageSize={20} type='custom' ratingColor='#134563' ratingBackgroundColor='white' readonly startingValue={data.rating} />

            },

        ]
        return list;
    }
    exchange = async () => {
        // console.log(this.props.route.params.id);
        // console.log(this.props.route.params.id_sender);
        // console.log(this.props.route.params.id_receiver);
        this.setState(
            {
                visible: true
            })
        await sendRequest(this.props.route.params.id, this.props.route.params.id_sender, this.props.route.params.id_receiver)
            .then(res => {
                this.setState(
                    {
                        visible: false
                    })
                if (res.result == "Request added successfully") {
                    Alert.alert(
                        "Toys Exchange:",
                        res.result,
                        [
                            {
                                text: "OK",
                                onPress: () => this.props.navigation.navigate('Home',
                                {
                                    load:'load'
                                }),
                                style: "cancel"
                            }
                        ]
                    );

                }
                else {
                    Alert.alert(
                        "Toys Exchange:",
                        res.result,
                        [
                            {
                                text: "OK",
                                style: "cancel"
                            }
                        ]
                    );
                }
            })
            .catch(err => console.log(err));

    }
    // componentDidMount()
    // {
    //     // console.log(this.props.route.params.id_sender)
    //     // console.log(this.props.data_user)
    // }
    render() {
        const { route } = this.props
        this.state.list.push(route.params);
        var button;
        if (this.props.route.params.screen === 'exchange') {
            button =
                <>
                    <Button
                        mode="contained"
                        onPress={this.acceptGetRequest}
                        style={{
                            width: Dimensions.get('window').width / 3,
                            marginRight: 20,
                            marginLeft: 20
                        }}
                        color={'#134563'}
                    >
                        Accept
                    </Button>
                    <Button
                        mode="contained"
                        onPress={this.rejectGetRequest}
                        style={{
                            width: Dimensions.get('window').width / 3,
                            marginLeft: 20,
                            marginRight: 20,
                        }}
                        color={'#D22A37'}

                    >
                        Reject
                    </Button>
                </>
        }
        else {
            button =
                <>
                    <Button
                        mode="contained"
                        onPress={this.exchange}
                        style={{
                            width: Dimensions.get('window').width / 3,
                            marginRight: 20,
                            marginLeft: 20
                        }}
                        color={'#134563'}
                    >
                        Exchange
                    </Button>
                </>
        }
        return (
            <Provider>
                <View

                    style={{ flex: 1, flexDirection: 'column' }}>
                    <Portal>
                        <Modal visible={this.state.visible} dismissable contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20 }}>
                            <Text style={{ marginBottom: 10 }}>Please waiting ...</Text>
                            <ProgressBar progress={0.2} color={'#00552E'} indeterminate={true} />
                        </Modal>
                    </Portal>
                    <View style={{ flex: 50, backgroundColor: 'white' }}>
                        <Image
                            style={{
                                width: Dimensions.get('window').width,
                                height: '100%',
                                resizeMode: 'stretch'
                            }}
                            source={{ uri: 'data:image/jpeg;base64,' + this.props.route.params.image.base64 }}
                        />
                    </View>
                    <View style={{ flex: 45, backgroundColor: 'white' }}>
                        <FlatList
                            keyExtractor={item => item.name}
                            data={this.getListData(this.state.list[0])}
                            renderItem={({ item, index }) => {
                                return (
                                    <FlatListItem
                                        navigation={this.props.navigation}
                                        item={item}
                                        index={index}
                                        parentFlatList={this}>

                                    </FlatListItem>
                                )
                            }}
                        />
                    </View>
                    <View style={{
                        width: Dimensions.get('window').width,
                        flex: 10,
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {button}
                    </View>
                </View>
            </Provider>

        )
    }
}
class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null,
            numberOfRefresh: 0,
        }
    }

    render() {
        const flatListData = this.props.parentFlatList
        return (
            <ListItem
                style={{ backgroundColor: 'white' }}
                // bottomDivider
                disabled
                containerStyle={{ marginLeft: 20, marginRight: 20, padding: 5, marginTop: 10 }}>
                <ListItem.Content>
                    <ListItem.Title style={{ fontSize: 16, paddingBottom: 5 }}>{this.props.item.name}</ListItem.Title>
                    <ListItem.Subtitle style={{ fontSize: 14, color: '#95ACB9' }}>{this.props.item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        );
    }
}