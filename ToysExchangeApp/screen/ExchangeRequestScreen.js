import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image,Alert } from 'react-native'
import { FAB, Button, ProgressBar } from 'react-native-paper'
import { ListItem, Avatar, SearchBar, Rating } from 'react-native-elements'
import { getListRequest, rejectRequest } from '../service/UserService';
class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null,
            numberOfRefresh: 0,
        }
    }
    reject = async () => {
        await rejectRequest( this.props.item._idToy)
            .then(res => {
                if (res.result == "Cancel successfully") {
                    Alert.alert(
                        "Toys Exchange:",
                        res.result,
                        [
                            {
                                text: "OK",
                                onPress: () => this.props.navigation.navigate('Home',
                                {
                                    load: 'load'
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
    render() {
        const flatListData = this.props.parentFlatList
        let item = this.props.item
        return (
            <ListItem
                onPress={() => this.props.navigation.navigate('Details', {
                    id: item._id,
                    name: item.Toy[0].Name,
                    image: item.Toy[0].Image,
                    category: item.Category[0].Name,
                    name_user: item.User[0].Name,
                    rating: item.Rating,
                    datetime: item.Datetime,
                    description: item.Description,
                    address: item.Address,
                    screen: 'exchange'
                })}
                underlayColor='#134563'
                bottomDivider
                containerStyle={{ marginLeft: 10, borderBottomColor: '#95ACB9', borderBottomWidth: 1, marginRight: 10 }}>
                <Avatar source={{ uri: 'data:image/jpeg;base64,' + item.Toy[0].Image.base64 }} size='large' />
                <ListItem.Content>
                <ListItem.Title style={{ fontSize: 16, fontWeight: 'bold' }}>{item.Toy[0].Name}</ListItem.Title>
                    <ListItem.Title style={{ fontSize: 16, fontWeight: 'bold' }}>Request by id user: {item._idSender}</ListItem.Title>
                    <ListItem.Title style={{ fontSize: 14 }}>{item.Category}</ListItem.Title>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Button mode="contained"
                            onPress={this.reject}
                            color='#D22A37'
                            style={{
                                margin: 10
                            }}>
                            Reject
                            </Button>
                        <Text style={{ color: '#134563' }}>A waiting for approval</Text>
                    </View>


                </ListItem.Content>
            </ListItem>
        );
    }
}
export default class ExchangeRequestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: '',
            visible: false
        }
    }
    componentDidMount() {
        this.getListData();
    }
    getListData = async () => {
        this.setState({
            visible: true
        })
        await getListRequest(this.props.route.params.data_user._id)
            .then(res => {
                if (res.length !== 0) {
                    this.setState({
                        list: res
                    })
                    // console.log(this.state.list[0].Toy)
                }
                else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err));
        this.setState({
            visible: false
        })
    }
    render() {
        var flatlist;
        if (this.state.list !== '') {
            flatlist = <FlatList
                keyExtractor={item => item._id}
                data={this.state.list}
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


        }
        else {
            flatlist = <Text style={{
                flex: 1,
                justifyContent: 'center',
                textAlign: 'center',
                margin: 50,
                fontSize: 26,
                color: 'grey'
            }}>No Request Found</Text>
        }
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ProgressBar progress={0.2} color={'#00552E'} indeterminate={true} visible={this.state.visible} />
                {flatlist}
            </View>
        )
    }
}
