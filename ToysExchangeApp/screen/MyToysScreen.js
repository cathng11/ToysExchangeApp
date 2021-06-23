import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image } from 'react-native'
import { FAB, ProgressBar } from 'react-native-paper'
import { ListItem, Avatar, SearchBar, Rating } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import { getUserToy } from '../service/UserService';

class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null,
            numberOfRefresh: 0,
        }
    }
    refreshFlatListItem = () => {
        this.setState((prevState) => {
            return {
                numberOfRefresh: prevState.numberOfRefresh + 1
            }
        })

    }

    render() {
        const flatListData = this.props.parentFlatList
        const swipeSettings = {
            autoClose: true,

            onClose: (secId, rowId, direction) => {
                if (this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.item.id });
            },
            right: [
                {
                    onPress: () => {
                        this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index], this);
                    },
                    text: 'Edit', type: 'primary'
                },
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [
                                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                                {
                                    text: 'Yes', onPress: () => {
                                        flatListData.splice(this.props.index, 1);
                                        this.props.parentFlatList.refreshFlatList(deletingRow)
                                    }
                                },
                            ],
                            { cancelable: true });
                    },
                    text: 'Delete', type: 'delete'
                }]
        }
        let item = this.props.item
        return (

            <Swipeout
                {...swipeSettings}
                style={{ backgroundColor: 'white' }}>
                <ListItem
                    onPress={() => this.props.navigation.navigate('Details', {
                        id: item._id,
                        name: item.Name,
                        image: item.Image,
                        category: item.Category[0].Name,
                        name_user: item.User[0].Name,
                        rating: item.Rating,
                        datetime: item.Datetime,
                        description: item.Description,
                        address: item.Address,
                    })}
                    underlayColor='#134563'
                    bottomDivider
                    containerStyle={{ marginLeft: 10, borderBottomColor: '#95ACB9', borderBottomWidth: 1, marginRight: 10 }}>
                    <Avatar source={{ uri: 'data:image/jpeg;base64,' + item.Image.base64 }} size='large' />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 16, fontWeight: 'bold' }}>{item.Name}</ListItem.Title>
                        <ListItem.Title style={{ fontSize: 14 }}>{item.Category[0].Name}</ListItem.Title>
                        <ListItem.Subtitle>Add by: {item.User[0].Name}</ListItem.Subtitle>
                        <Rating imageSize={20} readonly startingValue={item.Rating} />
                        <ListItem.Subtitle>{item.Datetime}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </Swipeout >
        );
    }
}
export default class MyToysScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: '',
            visible: false
        }
    }
    getListData = async () => {
        this.setState({
            visible: true
        })
        await getUserToy(this.props.route.params.data_user._id)
            .then(res => {
                if (res.length !== 0)
                    this.setState({
                        list: res
                    })
                else {
                    console.log(res)
                }
            })
            .catch(err => console.log(err));
        this.setState({
            visible: false
        })
    }
    componentDidMount() {
        if (this.props.route.params) {
            this.getListData();
        }
        this.getListData();
        // console.log(this.props.route.params)

    }
    componentDidUpdate(prev) {
        if (this.props.route != prev.route) {
            this.getListData();
        }

    }
    render() {
        // console.log(this.state.list)
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
            }}>No Toys Found</Text>
        }

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <ProgressBar progress={0.2} color={'#00552E'} indeterminate={true} visible={this.state.visible} />
                {flatlist}
                <FAB
                    style={{
                        position: 'absolute',
                        margin: 20,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#134563'
                    }}
                    large
                    icon="plus"
                    onPress={() => this.props.navigation.navigate('AddToys',
                        {
                            data_user: this.props.route.params.data_user
                        })}
                />
            </View>
        )
    }
}

