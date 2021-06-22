import React, { Component } from 'react'
import { Alert, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import { Dimensions, Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { TextInput, Title, Button, HelperText, Avatar, List, FAB } from 'react-native-paper'
import * as ImagePicker from "react-native-image-picker"
import { signUp } from '../service/UserService';

export default class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            country: '',
            parent_phone: '',
            resourcePath: {},
            parent_email: '',
            username: '',
            password: '',
        }
    }
    signUp = async () => {
        await signUp(this.state.name, this.state.country, this.state.parent_phone, this.state.parent_email, this.state.username, this.state.password, this.state.resourcePath)
            .then(res => {
                if (res.result=="Register successfully")
                {
                    Alert.alert(
                        "Toys Exchange:",
                        res.result,
                        [
                          {
                            text: "OK",
                            onPress: () => this.props.goToLogin(),
                            style: "cancel"
                          }
                        ]
                      );
                    
                }
                else
                {
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
    selectFile = () => {
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: true,
                maxHeight: 200,
                maxWidth: 200,
            },
            (response) => {
                console.log(response);
                this.setState({ resourcePath: response });
            },
        )
    };
    render() {
        const img = this.state.resourcePath.uri == null ?
            <Avatar.Image
                style={{ backgroundColor: 'white' }}
                size={200}
                source={require('../images/empty_avatar.png')} />
            :
            <>
                <Image
                    source={{
                        uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,
                    }}
                // style={{ width: 100, height: 100 }}
                />
                <Avatar.Image
                    style={{ backgroundColor: 'white' }}
                    size={200}
                    source={{ uri: this.state.resourcePath.uri }} />

            </>
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{ backgroundColor: 'white', flex: 90 }}>
                    <ScrollView>
                        <View style={{ margin: 10, flex: 20, justifyContent: 'center', alignItems: 'center' }}>
                            {img}
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
                        <View style={{ margin: 20, flex: 80 }}>
                            <TextInput
                                label='Name'
                                placeholder='Name'
                                mode='outlined'
                                value={this.state.name}
                                onChangeText={name => { this.setState({ name: name }) }}
                                theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                                style={{ backgroundColor: 'white' }}
                            />
                            <TextInput
                                label='Country'
                                placeholder='Country'
                                mode='outlined'
                                theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                                style={{ backgroundColor: 'white' }}
                                value={this.state.country}
                                onChangeText={country => { this.setState({ country: country }) }}
                            />
                            <TextInput
                                label='Parent Phone'
                                placeholder='Parent Phone'
                                mode='outlined'
                                theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                                style={{ backgroundColor: 'white' }}
                                value={this.state.parent_phone}
                                onChangeText={parent_phone => { this.setState({ parent_phone: parent_phone }) }}
                            />
                            <TextInput
                                label='Parent Email'
                                placeholder='Parent Email'
                                mode='outlined'
                                value={this.state.parent_email}
                                onChangeText={parent_email => { this.setState({ parent_email: parent_email }) }}
                                theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                                style={{ backgroundColor: 'white' }}
                            />
                            <TextInput
                                label='Username'
                                placeholder='Username'
                                mode='outlined'
                                theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                                style={{ backgroundColor: 'white' }}
                                value={this.state.username}
                                onChangeText={username => { this.setState({ username: username }) }}
                            />
                            <TextInput
                                label='Password'
                                placeholder='Password'
                                secureTextEntry
                                mode='outlined'
                                theme={{ colors: { primary: '#134563', underlineColor: 'transparent', placeholder: '#134563' } }}
                                style={{ backgroundColor: 'white' }}
                                value={this.state.password}
                                onChangeText={password => { this.setState({ password: password }) }}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={{
                    flex: 10,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end'
                }}>
                    <Button
                        mode="contained"
                        onPress={this.signUp}
                        color='#134563'
                        style={{
                            width: Dimensions.get('window').width
                        }}>
                        Sign Up
                        </Button>
                </View>
            </View>


        )
    }
}
