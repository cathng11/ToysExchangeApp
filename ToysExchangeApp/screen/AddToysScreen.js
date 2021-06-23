import React, { Component } from 'react'
import { Alert, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import { Dimensions, Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput, Title, Button, HelperText, Avatar, List, FAB, Provider, Portal, Modal, ProgressBar } from 'react-native-paper'
import * as ImagePicker from "react-native-image-picker"
import { addToy } from '../service/UserService';
import { Keyboard } from 'react-native'

export default class AddToysScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toy_title: '',
            address: '',
            description: '',
            resourcePath: {},
            category_name: '',
            category_id: '',
            expanded_cate: false,
            id_user: '',
            visible: false

        }
    }

    getCurrentDate = () => {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        return date + '-' + month + '-' + year;
    }
    submit = async () => {
        this.setState({
            visible: true
        })
        Keyboard.dismiss();
        await addToy(this.state.resourcePath, this.state.toy_title, this.state.category_id, this.props.route.params.data_user._id, this.getCurrentDate(), this.state.description, this.state.address)
            .then(res => {
                this.setState({
                    visible: false
                })
                if (res.result === "Toy added successfully") {
                    Alert.alert(
                        "ToysExchange:",
                        res.result,
                        [
                            {
                                text: "OK",
                                onPress: () => this.props.navigation.navigate('MyToys',
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
                        "ToysExchange:",
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
    selectFile = () => {
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: true,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                // console.log(response);
                this.setState({ resourcePath: response });
            },
        )
    };
    render() {
        const category = [
            {
                item: 'Animals',
                id: 1,
            },
            {
                item: 'Outdoor Activities',
                id: 2,
            },
            {
                item: 'Vehicles',
                id: 3,
            },
            {
                item: 'Musical Instrucment',
                id: 4,
            },
            {
                item: 'Learning and Educational',
                id: 5,
            },
            {
                item: 'Tech Toys',
                id: 6,
            },
            {
                item: 'Characters Toys',
                id: 7,
            }
        ]
        const category_list = category.map((item, index) => {
            return <List.Item
                title={item.item}
                value={item.id}
                onPress={() => {
                    console.log(item.id);
                    this.setState({
                        category_name: item.item,
                        category_id: item.id,
                        expanded_cate: false
                    })
                }}
                key={index} />
        })
        const img = this.state.resourcePath.uri == null ?
            <Image
                source={require('../images/image_holder_icon.png')}
                style={{
                    width: Dimensions.get('window').width * 2 / 3,
                    height: Dimensions.get('window').height / 3,
                    resizeMode: 'contain'
                }}
            /> :
            <>
                <Image
                    source={{
                        uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,
                    }}
                // style={{ width: 100, height: 100 }}
                />
                <Image
                    source={{ uri: this.state.resourcePath.uri }}
                    style={{
                        width: Dimensions.get('window').width * 2 / 3,
                        height: Dimensions.get('window').height / 3,
                        resizeMode: 'contain'
                    }}
                />
            </>
        return (
            <Provider>
                <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
                    <Portal>
                        <Modal visible={this.state.visible} dismissable contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20 }}>
                            <Text style={{ marginBottom: 10 }}>Please waiting ...</Text>
                            <ProgressBar progress={0.2} color={'#00552E'} indeterminate={true} />
                        </Modal>
                    </Portal>
                    <View style={{ margin: 10, flex: 20, justifyContent: 'center', alignItems: 'center' }}>

                        {img}

                        {/* <Text style={{ alignItems: 'center' }}>
                                {this.state.resourcePath.uri}
                            </Text> */}
                        <FAB
                            style={{
                                position: 'absolute',
                                margin: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: '#134563'
                            }}
                            large
                            icon="camera"
                            onPress={this.selectFile}
                        />
                    </View>
                    <View style={{ margin: 20, flex: 60 }}>
                        <TextInput
                            label='Toy Title'
                            placeholder='Toy Title'
                            mode='flat'
                            value={this.state.toy_title}
                            onChangeText={toy_title => { this.setState({ toy_title: toy_title }) }}
                            theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                            style={{ backgroundColor: 'white' }}
                        />
                        <TextInput
                            label='Address'
                            placeholder='Address'
                            mode='flat'
                            theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                            style={{ backgroundColor: 'white' }}
                            value={this.state.address}
                            onChangeText={address => { this.setState({ address: address }) }}
                        />
                        <List.Accordion
                            title="Category"
                            expanded={this.state.expanded_cate}
                            onPress={() => this.setState({ expanded_cate: !this.state.expanded_cate })}
                            theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: 'grey'
                            }}
                        >
                            {category_list}
                            {/* <List.Item title="First item" />
                        <List.Item title="Second item" /> */}
                        </List.Accordion>
                        <Text style={{ paddingTop: 10, paddingLeft: 20 }}>{this.state.category_name}</Text>
                        <TextInput
                            label='Desciption'
                            placeholder='Desciption'
                            multiline
                            mode='flat'
                            theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                            style={{ backgroundColor: 'white' }}
                            value={this.state.description}
                            onChangeText={description => { this.setState({ description: description }) }}
                        />
                    </View>

                    <View style={{ flex: 20 }}>
                        <Button
                            mode="contained"
                            onPress={this.submit}
                            color='#134563'
                            style={{
                                margin: 30,
                                marginHorizontal: Dimensions.get('window').height / 6,
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative'
                            }}>
                            Submit
                </Button>
                    </View>

                </ScrollView>
            </Provider>


        )
    }
}
